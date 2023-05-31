import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import dynamic from 'next/dynamic'
import React, { useEffect, useState, } from "react"
const inter = Inter({ subsets: ['latin'] })

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

export default function Home() {


  const [funcA, setFuncA] = useState<number>(2);
  const [funcB, setFuncB] = useState<number>(4);
  const [funcC, setFuncC] = useState<number>(-3);
  const [funcD, setFuncD] = useState<number>(0);

  let [windowWidth, setWindowWidth] = useState<number>(500);
  let [pixelScale, setPixelScale] = useState<number>(25);
  let width = windowWidth;
  let height = windowWidth;
  const setup = (p5: any, canvasParentRef: any) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.stroke("#000000");
  };
  useEffect(() => {

    return resizeCheck();
  }, []);

  function onChangeA() {
    let val = parseFloat((document.getElementById("function-a") as HTMLInputElement).value);
    setFuncA(isNaN(val) ? 2 : val); 
  }
  
  function onChangeB() {
    let val = parseFloat((document.getElementById("function-b") as HTMLInputElement).value);
    setFuncB(isNaN(val) ? 4 : val); 
  }
  
  function onChangeC() {
    let val = parseFloat((document.getElementById("function-c") as HTMLInputElement).value);
    setFuncC(isNaN(val) ? -3 : val); 
  }
  
  function onChangeD() {
    let val = parseFloat((document.getElementById("function-d") as HTMLInputElement).value);
    setFuncD(isNaN(val) ? 0 : val); 
  }
  
  
  
  const resizeCheck = () => {
    if (window.innerWidth < 625) {
      setWindowWidth(250);
      setPixelScale(12.5);
    } else {
      setWindowWidth(500);
      setPixelScale(25);
    }
  };
  const draw = (p5: any) => {
    p5.background("#FFF");
    p5.stroke("black");

    // Axis

    function axis() {
      p5.strokeWeight(2);
      p5.line(width / 2, height, width / 2, 0);
      p5.strokeWeight(2);
      p5.line(0, height / 2, width, height / 2);
    }

    axis();

    // BG lines
    for (var x = 0; x < width / pixelScale; x++) {
      p5.strokeWeight(0.1);
      p5.line(x * pixelScale, 0, x * pixelScale, height);
      p5.strokeWeight(0.1);
      p5.line(0, x * pixelScale, width, x * pixelScale);
    }

    p5.translate(width / 2, height / 2);
    p5.scale(1, -1);
    p5.fill("#fff");
    p5.fill("#900");


    p5.strokeWeight(3);
    p5.noFill();
    p5.beginShape();
    p5.stroke("#06A");
    
    for (let x = 10; x > -10; x -= 0.1) {
      let ycubic = funcA * Math.pow(x, 3) + funcB * Math.pow(x, 2) + funcC * x + funcD;
      p5.vertex(x * pixelScale, ycubic * pixelScale);
    }
    
    p5.endShape();
    p5.stroke("#a00");
    p5.fill("#a00");

    p5.push();
    p5.scale(1, -1); // reverse the global flip
    p5.strokeWeight(1);
    p5.textStyle(p5.NORMAL);
    p5.textSize(12);

    for (let t = -5; t < 10; t += 5) {
      p5.stroke("#000");
      p5.fill("#000");
      p5.text(t, 25 * t - 5, 15);
      p5.text(t, 3, 25 * -t + 5);
    }

    p5.pop();

  };
  const windowResized = (p5: any) => {
    resizeCheck();

    p5.resizeCanvas(width, height);
  };

  return (
    <>
      <Head>
        <title>Trigonometry Calculator</title>
        <meta name="description" content="Trigonometry Calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
      <>
          <br></br>
          <div className={styles["p5-container"]}>

            <div className={styles["p5-sketch-details"]}>
                <div className={styles["p5-selection-range"]}>
                  <div>
                    <input
                      id="function-a"
                      type="range"
                      min="-20"
                      max="20"
                      onChange={onChangeA}
                    ></input>
                    <div id="function-a-label">A = {funcA}</div>
                  </div>
                  <div>
                    <input
                      id="function-b"
                      type="range"
                      min="-50"
                      max="50"
                      onChange={onChangeB}
                    ></input>
                    <div id="function-b-label">B = {funcB}</div>
                  </div>
                  <div>
                    <input
                      id="function-c"
                      type="range"
                      min="-20"
                      max="20"
                      onChange={onChangeC}
                    ></input>
                    <div id="function-c-label">C = {funcC}</div>
                  </div>
                  <div>
                    <input
                      id="function-d"
                      type="range"
                      min="-20"
                      max="20"
                      onChange={onChangeD}
                    ></input>
                    <div id="function-d-label">D = {funcD}</div>
                  </div>
                </div>
              
                <p className="exclude-fast-read">
                  <strong>
                    y ={" "}
                    {Math.sign(funcA) == 0 ? (
                      ``
                    ) : (
                      <>
                        {funcA}x<sup>3</sup>
                      </>
                    )}
                    {Math.sign(funcB) == 0 ? (
                      ``
                    ) : funcB >= 0 ? (
                      <>
                        {funcA == 0 ? `` : `+`} {funcB}x<sup>2</sup>
                      </>
                    ) : (
                      <>
                        {" "}
                        - {Math.abs(funcB)}x<sup>2</sup>
                      </>
                    )}
                    {Math.sign(funcC) == 0
                      ? ``
                      : funcC >= 0
                      ? `${funcA == 0 ? `` : `+`} ${funcC}x`
                      : ` - ${Math.abs(funcC)}x`}
                    {Math.sign(funcD) == 0
                      ? ``
                      : funcD >= 0
                      ? `${funcD == 0 ? `` : `+`} ${funcD}`
                      : ` - ${Math.abs(funcD)}`}
                  </strong>
                </p>
              
            </div>

            <Sketch setup={setup} draw={draw} windowResized={windowResized} />
          </div>
          <br></br>
        </>
      </main>
    </>
  )
}
