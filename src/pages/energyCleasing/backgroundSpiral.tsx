import { useEffect, useRef } from "react";

export default function BackgroundSpiral() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float r = length(uv);
        float angle = atan(uv.y, uv.x);
        
        // Espiral e torção do design original
        float twist = angle + 8.0 * exp(-r * 2.5) - u_time * 1.5;
        float spiral1 = sin(twist * 4.0) * 0.5 + 0.5;
        float spiral2 = sin(twist * 7.0 + u_time * 0.5) * 0.5 + 0.5;
        float flow = spiral1 * 0.6 + spiral2 * 0.4;
        float disk = smoothstep(0.7, 0.0, r);
        
        // Cores padrão (Lilás e Indigo)
        vec3 coreColor = vec3(0.85, 0.60, 1.0); // Lilás vibrante
        vec3 edgeColor = vec3(0.25, 0.05, 0.55); // Indigo profundo
        
        vec3 col = mix(edgeColor, coreColor, flow * disk);
        col *= flow * disk * 2.5;
        
        // Brilho central
        col += vec3(0.9, 0.85, 1.0) * smoothstep(0.15, 0.0, r) * 1.2;
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 
        -1.0, 1.0,  1.0, -1.0, 1.0,  1.0
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");

    function resizeCanvas() {
      if (!canvas || !gl) return;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      }
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let animationId: number;

    function render(time: number) {
      if (!gl) return;
      gl.uniform1f(timeLocation, time * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    }

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-90 backdrop-blur-2xl">
      <canvas ref={canvasRef} className="absolute inset-0 w-[120%] h-[120%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover mix-blend-screen" />
    </div>
  );
}
