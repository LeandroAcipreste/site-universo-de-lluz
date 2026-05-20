import { useEffect, useRef } from "react";
import "./backgroundSpiral.css";

export default function BackgroundSpiral() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true });
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
        
        // Cores metálicas do logotipo (Prata e Platina)
        vec3 coreColor = vec3(0.87, 0.88, 0.89); // Platina brilhante (#DDE0E3)
        vec3 edgeColor = vec3(0.36, 0.38, 0.40); // Cromo escuro (#5B6166)
        
        vec3 col = mix(edgeColor, coreColor, flow * disk);
        col *= flow * disk * 2.5;
        
        // Brilho central (Branco platina de alta intensidade)
        col += vec3(0.95, 0.96, 0.98) * smoothstep(0.15, 0.0, r) * 1.2;
        
        // Alpha baseado na intensidade para não criar um bloco preto
        float alpha = clamp(length(col) * 1.2, 0.0, 1.0);
        
        gl_FragColor = vec4(col, alpha);
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
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let animationId: number;

    function render(time: number) {
      if (!gl) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
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
    <div className="spiral-bg">
      <canvas
        ref={canvasRef}
        className="spiral-bg__canvas"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
}
