/**
 * A espiral de luz — porte de
 * `site-antigo/site-UL/src/pages/energyCleasing/backgroundSpiral.tsx`.
 *
 * Um único quadrilátero de tela cheia com um shader de fragmento: a espiral
 * inteira é matemática, não textura. O GLSL é cópia literal do original,
 * inclusive os comentários dele — as cores são a prata e a platina da logo.
 *
 * É WebGL cru, sem three.js, também como no original: para desenhar dois
 * triângulos e um shader, o three seria peso morto — e esta página já não tem
 * cena 3D nenhuma.
 */

const VERTICE = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENTO = `
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
    float disk = smoothstep(0.45, 0.0, r); // Aura afinada/delicada

    // Cores metálicas do logotipo (Prata e Platina)
    vec3 coreColor = vec3(0.87, 0.88, 0.89); // Platina brilhante (#DDE0E3)
    vec3 edgeColor = vec3(0.36, 0.38, 0.40); // Cromo escuro (#5B6166)

    vec3 col = mix(edgeColor, coreColor, flow * disk);
    col *= flow * disk * 1.8; // Intensidade reduzida para mais delicadeza

    // Brilho central (Branco platina) afinado
    col += vec3(0.95, 0.96, 0.98) * smoothstep(0.1, 0.0, r) * 0.9;

    // Alpha baseado na intensidade
    float alpha = clamp(length(col) * 1.1, 0.0, 1.0);

    gl_FragColor = vec4(col, alpha);
  }
`;

function compilar(gl, tipo, fonte) {
  const shader = gl.createShader(tipo);
  gl.shaderSource(shader, fonte);
  gl.compileShader(shader);
  /* O original não checava o resultado. Aqui checa: um shader que não compila
     devolve tela preta e nenhum erro, e descobrir isso de olho custa caro. */
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('espiral: ' + gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

export function espiral(canvas) {
  const gl = canvas.getContext('webgl', { alpha: true });
  if (!gl) return;

  const vs = compilar(gl, gl.VERTEX_SHADER, VERTICE);
  const fs = compilar(gl, gl.FRAGMENT_SHADER, FRAGMENTO);
  if (!vs || !fs) return;

  const programa = gl.createProgram();
  gl.attachShader(programa, vs);
  gl.attachShader(programa, fs);
  gl.linkProgram(programa);
  gl.useProgram(programa);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1,
    -1, 1, 1, -1, 1, 1,
  ]), gl.STATIC_DRAW);

  const posicao = gl.getAttribLocation(programa, 'position');
  gl.enableVertexAttribArray(posicao);
  gl.vertexAttribPointer(posicao, 2, gl.FLOAT, false, 0, 0);

  const uResolucao = gl.getUniformLocation(programa, 'u_resolution');
  const uTempo = gl.getUniformLocation(programa, 'u_time');

  function redimensionar() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uResolucao, canvas.width, canvas.height);
  }
  window.addEventListener('resize', redimensionar);
  redimensionar();

  function desenhar(tempo) {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uTempo, tempo * 0.001);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(desenhar);
  }
  requestAnimationFrame(desenhar);
}
