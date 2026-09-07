import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface WavePlasmaShaderProps {
  className?: string;
  intensity?: number;
}

export const WavePlasmaShader: React.FC<WavePlasmaShaderProps> = ({
  className = 'absolute inset-0 w-full h-full pointer-events-none',
  intensity = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isDarkRef = useRef(isDark ? 1.0 : 0.0);

  // Keep target dark value updated
  useEffect(() => {
    isDarkRef.current = isDark ? 1.0 : 0.0;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (canvas.getContext('webgl', { alpha: true, antialias: true }) ||
        canvas.getContext('experimental-webgl', { alpha: true, antialias: true })) as WebGLRenderingContext | null;
    } catch {
      // WebGL creation may fail in sandboxed or headless environments
      gl = null;
    }

    if (!gl) return;

    let animationFrameId: number | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let handleMouseMove: ((event: MouseEvent) => void) | null = null;
    let buf: WebGLBuffer | null = null;
    let vs: WebGLShader | null = null;
    let fs: WebGLShader | null = null;
    let prog: WebGLProgram | null = null;

    try {
      let currentDark = isDarkRef.current;

      // Synchronize canvas size with layout
      const syncSize = () => {
        try {
          const rect = canvas.getBoundingClientRect();
          const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
          const w = Math.max(1, Math.floor((rect.width || 1280) * dpr));
          const h = Math.max(1, Math.floor((rect.height || 720) * dpr));

          if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
          }
        } catch {
          // ignore measurement errors
        }
      };

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(syncSize);
        resizeObserver.observe(canvas);
      }
      syncSize();

      // Vertex Shader
      const vsSource = `
        attribute vec2 a_position;
        varying vec2 v_texCoord;
        void main() {
          v_texCoord = a_position * 0.5 + 0.5;
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      // Fragment Shader - Digital Wave Plasma Matching User Specification
      const fsSource = `
        #ifdef GL_FRAGMENT_PRECISION_HIGH
        precision highp float;
        #else
        precision mediump float;
        #endif

        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_is_dark;
        uniform float u_intensity;
        varying vec2 v_texCoord;

        void main() {
          vec2 uv = v_texCoord;
          vec2 p = uv * 2.0 - 1.0;
          float resY = max(u_resolution.y, 1.0);
          p.x *= u_resolution.x / resY;

          // Subtle interactive mouse deflection
          vec2 mouseNorm = (u_mouse / max(u_resolution, vec2(1.0, 1.0))) * 2.0 - 1.0;
          mouseNorm.x *= u_resolution.x / resY;
          float distToMouse = length(p - mouseNorm);
          p += (p - mouseNorm) * exp(-distToMouse * 3.2) * 0.05;

          float t = u_time * 0.2;
          
          // Abstract flowing digital wave/plasma
          float col = 0.0;
          for(float i = 1.0; i < 4.0; i++) {
            p.x += 0.3 / i * sin(i * 3.0 * p.y + t + i * 0.5);
            p.y += 0.3 / i * cos(i * 3.0 * p.x + t + i * 0.8);
            col += abs(0.005 / max(abs(p.y), 0.001));
          }
          
          // Brand-aligned colors: Deep blues and magentas
          vec3 color1 = vec3(0.0, 0.48, 1.0); // Electric Blue
          vec3 color2 = vec3(1.0, 0.0, 0.6);  // Magenta
          vec3 finalColor = mix(color1, color2, clamp(uv.x * 0.5 + 0.5 * sin(t), 0.0, 1.0));
          finalColor *= col * u_intensity;
          
          // Dark surface blending (from user shader specification)
          vec3 darkSurface = vec3(0.07, 0.08, 0.1);
          vec3 darkFinal = mix(darkSurface, finalColor, 0.60);

          // Light mode surface blending
          vec3 lightSurface = vec3(0.965, 0.975, 0.995);
          vec3 lightColor = mix(vec3(0.0, 0.50, 0.98), vec3(0.92, 0.10, 0.60), clamp(uv.x * 0.5 + 0.5 * sin(t), 0.0, 1.0));
          float lightAlpha = clamp(col * 0.42 * u_intensity, 0.0, 0.65);
          vec3 lightFinal = mix(lightSurface, lightColor, lightAlpha);

          // Smooth transition between themes
          vec3 result = mix(lightFinal, darkFinal, u_is_dark);
          
          gl_FragColor = vec4(result, 1.0);
        }
      `;

      const compileShader = (type: number, src: string) => {
        if (!gl) return null;
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      vs = compileShader(gl.VERTEX_SHADER, vsSource);
      fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) {
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
        return;
      }

      prog = gl.createProgram();
      if (!prog) {
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
        return;
      }
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);

      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
        if (prog) gl.deleteProgram(prog);
        return;
      }

      gl.useProgram(prog);

      // Full screen quad geometry
      buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );

      const pos = gl.getAttribLocation(prog, 'a_position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      const uTime = gl.getUniformLocation(prog, 'u_time');
      const uRes = gl.getUniformLocation(prog, 'u_resolution');
      const uMouse = gl.getUniformLocation(prog, 'u_mouse');
      const uIsDark = gl.getUniformLocation(prog, 'u_is_dark');
      const uIntensity = gl.getUniformLocation(prog, 'u_intensity');

      // Mouse coordinates tracking
      let targetMouse = { x: canvas.width / 2, y: canvas.height / 2 };
      let smoothMouse = { x: canvas.width / 2, y: canvas.height / 2 };

      handleMouseMove = (event: MouseEvent) => {
        try {
          const rect = canvas.getBoundingClientRect();
          if (rect.width && rect.height) {
            const nx = (event.clientX - rect.left) / rect.width;
            const ny = 1.0 - (event.clientY - rect.top) / rect.height;
            targetMouse.x = nx * canvas.width;
            targetMouse.y = ny * canvas.height;
          }
        } catch {
          // ignore
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // Render loop
      const render = (t: number) => {
        try {
          if (!gl || gl.isContextLost()) return;

          // Smooth mouse interpolation
          smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.05;
          smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.05;

          // Smooth theme color transition
          const targetDark = isDarkRef.current;
          currentDark += (targetDark - currentDark) * 0.08;

          gl.viewport(0, 0, canvas.width, canvas.height);

          if (uTime) gl.uniform1f(uTime, t * 0.001);
          if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
          if (uMouse) gl.uniform2f(uMouse, smoothMouse.x, smoothMouse.y);
          if (uIsDark) gl.uniform1f(uIsDark, currentDark);
          if (uIntensity) gl.uniform1f(uIntensity, intensity);

          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          animationFrameId = requestAnimationFrame(render);
        } catch {
          // gracefully stop loop if WebGL error occurs
        }
      };

      animationFrameId = requestAnimationFrame(render);
    } catch (e) {
      console.warn('WavePlasmaShader fallback activated:', e);
    }

    return () => {
      if (handleMouseMove) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      try {
        if (gl) {
          if (buf) gl.deleteBuffer(buf);
          if (vs) gl.deleteShader(vs);
          if (fs) gl.deleteShader(fs);
          if (prog) gl.deleteProgram(prog);
        }
      } catch {
        // ignore cleanup errors
      }
    };
  }, [intensity]);

  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        id="shader-canvas-ANIMATION_19"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};
