"use client";

import { useEffect, useRef } from "react";

/** Flow-divider band — a WebGL plasma of accent-coloured lines warping across a dark field. */
export function FlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const opts: WebGLContextAttributes = {
      preserveDrawingBuffer: true,
      antialias: true,
      premultipliedAlpha: false,
    };
    const gl =
      (canvas.getContext("webgl", opts) as WebGLRenderingContext | null) ||
      (canvas.getContext(
        "experimental-webgl",
        opts
      ) as WebGLRenderingContext | null);
    if (!gl) return;

    const vs = `attribute vec4 aVertexPosition; void main(){ gl_Position = aVertexPosition; }`;
    const fs = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      const float overallSpeed = 0.07;
      const float gridSmoothWidth = 0.015;
      const float scale = 5.0;
      const vec4 lineColor = vec4(0.941, 0.325, 0.110, 1.0);   /* #F0531C accent */
      const float minLineWidth = 0.002;
      const float maxLineWidth = 0.04;
      const float lineSpeed = 1.0 * overallSpeed;
      const float lineAmplitude = 1.0;
      const float lineFrequency = 0.2;
      const float warpSpeed = 0.2 * overallSpeed;
      const float warpFrequency = 0.5;
      const float warpAmplitude = 1.0;
      const float offsetFrequency = 0.5;
      const float offsetSpeed = 1.33 * overallSpeed;
      const float minOffsetSpread = 0.6;
      const float maxOffsetSpread = 2.0;
      const int linesPerGroup = 16;
      #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
      #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
      #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
      float random(float t){ return (cos(t)+cos(t*1.3+1.3)+cos(t*1.4+1.4))/3.0; }
      float getPlasmaY(float x, float horizontalFade, float offset){ return random(x*lineFrequency+iTime*lineSpeed)*horizontalFade*lineAmplitude+offset; }
      void main(){
        vec2 fragCoord = gl_FragCoord.xy;
        vec4 fragColor;
        vec2 uv = fragCoord.xy / iResolution.xy;
        vec2 space = (fragCoord - iResolution.xy/2.0)/iResolution.x*2.0*scale;
        float horizontalFade = 1.0 - (cos(uv.x*6.28)*0.5+0.5);
        float verticalFade = 1.0 - (cos(uv.y*6.28)*0.5+0.5);
        space.y += random(space.x*warpFrequency+iTime*warpSpeed)*warpAmplitude*(0.5+horizontalFade);
        space.x += random(space.y*warpFrequency+iTime*warpSpeed+2.0)*warpAmplitude*horizontalFade;
        vec4 lines = vec4(0.0);
        vec4 bgColor1 = vec4(0.055, 0.062, 0.075, 1.0);   /* cool near-black */
        vec4 bgColor2 = vec4(0.16, 0.075, 0.035, 1.0);    /* warm ember */
        for(int l=0; l<linesPerGroup; l++){
          float normalizedLineIndex = float(l)/float(linesPerGroup);
          float offsetTime = iTime*offsetSpeed;
          float offsetPosition = float(l)+space.x*offsetFrequency;
          float rand = random(offsetPosition+offsetTime)*0.5+0.5;
          float halfWidth = mix(minLineWidth, maxLineWidth, rand*horizontalFade)/2.0;
          float offset = random(offsetPosition+offsetTime*(1.0+normalizedLineIndex))*mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
          float linePosition = getPlasmaY(space.x, horizontalFade, offset);
          float line = drawSmoothLine(linePosition, halfWidth, space.y)/2.0 + drawCrispLine(linePosition, halfWidth*0.15, space.y);
          float circleX = mod(float(l)+iTime*lineSpeed, 25.0)-12.0;
          vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
          float circle = drawCircle(circlePosition, 0.01, space)*4.0;
          line = line + circle;
          lines += line*lineColor*rand;
        }
        fragColor = mix(bgColor1, bgColor2, uv.x);
        fragColor *= verticalFade;
        fragColor.a = 1.0;
        fragColor += lines;
        gl_FragColor = fragColor;
      }`;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("flow shader", gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const prog = gl.createProgram();
    const v = compile(gl.VERTEX_SHADER, vs);
    const f = compile(gl.FRAGMENT_SHADER, fs);
    if (!prog || !v || !f) return;
    gl.attachShader(prog, v);
    gl.attachShader(prog, f);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("flow link", gl.getProgramInfoLog(prog));
      return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "aVertexPosition");
    const uRes = gl.getUniformLocation(prog, "iResolution");
    const uTime = gl.getUniformLocation(prog, "iTime");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    const start = performance.now();
    let raf = 0;
    const loop = () => {
      resize();
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(aPos);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
