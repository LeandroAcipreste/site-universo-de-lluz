import { useEffect, useRef } from "react";

/**
 * OracleBackground — Universo de Luz
 * Background inspirado no efeito de cortinas de luz verticais (creative-agency),
 * recolorido com a paleta Violeta / Índigo / Fúcsia do site.
 */
export default function OracleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false });
    if (!gl) return;

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Shader de "cortinas de luz" verticais com paleta Violeta/Índigo/Fúcsia
    const fsSource = `
      precision highp float;
      uniform vec2  u_resolution;
      uniform float u_time;

      // ── Paleta Universo de Luz ──
      // Índigo profundo → Violeta → Fúcsia
      vec3 palette(float t) {
        vec3 indigo  = vec3(0.20, 0.05, 0.60);   // #330099
        vec3 violet  = vec3(0.55, 0.15, 0.90);   // #8b25e6
        vec3 fuchsia = vec3(0.85, 0.15, 0.80);   // #d926cc
        vec3 white   = vec3(0.95, 0.90, 1.00);   // brilho central
        if (t < 0.33) return mix(indigo,  violet,  t / 0.33);
        if (t < 0.66) return mix(violet,  fuchsia, (t - 0.33) / 0.33);
        return mix(fuchsia, white, (t - 0.66) / 0.34);
      }

      float curtain(float x, float phase, float speed, float width) {
        float pos  = sin(x * 3.14159 * width + phase + u_time * speed);
        return smoothstep(0.88, 1.0, abs(pos));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;

        // ── Fundo base: gradiente preto → índigo profundo ──
        vec3 bg = mix(vec3(0.0), vec3(0.08, 0.01, 0.22), uv.y * 0.7);

        float totalGlow = 0.0;
        vec3  col       = bg;

        // ── 12 cortinas de luz, velocidades e fases variadas ──
        float phases[12];
        phases[0]  =  0.00; phases[1]  =  0.52; phases[2]  =  1.05;
        phases[3]  =  1.57; phases[4]  =  2.09; phases[5]  =  2.62;
        phases[6]  =  3.14; phases[7]  =  3.67; phases[8]  =  4.19;
        phases[9]  =  4.71; phases[10] =  5.23; phases[11] =  5.76;

        float speeds[12];
        speeds[0]  = 0.30; speeds[1]  = 0.22; speeds[2]  = 0.38;
        speeds[3]  = 0.18; speeds[4]  = 0.42; speeds[5]  = 0.27;
        speeds[6]  = 0.35; speeds[7]  = 0.20; speeds[8]  = 0.45;
        speeds[9]  = 0.25; speeds[10] = 0.32; speeds[11] = 0.16;

        float widths[12];
        widths[0]  = 1.0; widths[1]  = 1.5; widths[2]  = 0.8;
        widths[3]  = 1.2; widths[4]  = 0.9; widths[5]  = 1.6;
        widths[6]  = 1.1; widths[7]  = 0.7; widths[8]  = 1.4;
        widths[9]  = 1.3; widths[10] = 0.6; widths[11] = 1.7;

        for (int i = 0; i < 12; i++) {
          float g = curtain(uv.x, phases[i], speeds[i], widths[i]);

          // Fade vertical: mais intenso no centro-topo, desvane embaixo
          float fade = smoothstep(0.0, 0.5, uv.y) * smoothstep(1.0, 0.4, uv.y);

          float t = float(i) / 11.0;
          vec3 c  = palette(t);

          // Brilho da cortina (mix aditivo)
          col += c * g * fade * 1.8;
          totalGlow += g * fade;
        }

        // ── Brilho central vertical forte ──
        float cx    = abs(uv.x - 0.5);
        float beam  = smoothstep(0.16, 0.0, cx);
        float beamY = smoothstep(0.0, 1.0, uv.y) * smoothstep(1.0, 0.1, uv.y);
        col += palette(0.55) * beam * beamY * 2.5;

        // ── Glow nebulosa (indigo/fúcsia) ──
        float nebula = exp(-pow(2.0 * (uv.x - 0.5), 2.0)) * smoothstep(0.0, 0.7, uv.y);
        col += vec3(0.30, 0.05, 0.70) * nebula * 0.4;

        // Tone-map suave para não explodir
        col = col / (col + 0.8);
        col = pow(col, vec3(0.88));

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function createShader(type: number, source: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, source);
      gl!.compileShader(s);
      return s;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc  = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");

    function resize() {
      if (!canvas) return;
      canvas.width  = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl!.viewport(0, 0, canvas.width, canvas.height);
      gl!.uniform2f(resLoc, canvas.width, canvas.height);
    }

    window.addEventListener("resize", resize);
    resize();

    let raf: number;
    function render(t: number) {
      gl!.uniform1f(timeLoc, t * 0.001);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    }
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Estrelas sutis por cima */}
      <div
        className="absolute inset-0 z-10 opacity-25"
        style={{
          backgroundImage: [
            "radial-gradient(1px 1px at 15px 25px,#fff,transparent)",
            "radial-gradient(1px 1px at 60px 90px,#fff,transparent)",
            "radial-gradient(1.5px 1.5px at 110px 40px,#fff,transparent)",
            "radial-gradient(1px 1px at 180px 130px,#fff,transparent)",
            "radial-gradient(1px 1px at 250px 60px,#fff,transparent)",
            "radial-gradient(1.5px 1.5px at 320px 170px,#fff,transparent)",
          ].join(","),
          backgroundSize: "400px 220px",
        }}
      />
      {/* Vinheta nas bordas */}
      <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#000_100%)] opacity-70" />
    </div>
  );
}
