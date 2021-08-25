'use strict';
{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  const lap = document.getElementById('lap');
  const laped = document.getElementById('laped');


  let startTime;
  let timeoutId;
  let elapsedTime = 0; //タイマーが走っていた時間

  //padStart 2桁・3桁など指定した長さになるように文字列を埋めること
  //padStartは文字列に対してしか使えない⇒String() で文字列にする
  function countUp() {
    //分や秒を表示
    const d = new Date(Date.now() - startTime + elapsedTime);//カウントアップのほうで経過時間も含めてタイマーに表示
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}.${ms}`;

    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  //ボタンの有効/無効の切り替え
  // function setButtonStateInitial() {
  //   start.disabled = false;
  //   stop.disabled = true;
  //   reset.disabled = true;
    
  // }
  // function setButtonStateRunning() {
  //   start.disabled = true;
  //   stop.disabled = false;
  //   reset.disabled = true;
  // }
  // function setButtonStateStopped() {
  //   start.disabled = false;
  //   stop.disabled = true;
  //   reset.disabled = false;
  // }

//classを付けた場合、上のJSでは反映されないため、classをつけて呼ぶ
  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
    lap.classList.add('inactive');
  }
  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
    lap.classList.remove('inactive');
  }
  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
    lap.classList.add('inactive');
  }
  function setButtonStateLaping() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
    lap.classList.remove('inactive');
  }

  setButtonStateInitial();//最初はstartボタンのみ表示

  //startボタンをクリックしたときの処理
  start.addEventListener('click', () => {
    //ボタンを button タグで作っていたときのように操作を無効化することは出来ていない
    //例えば、Start を連打したあとに Stop 一回では止まってくれない
    //そのため、ボタンに inactive クラスがついていたらそれぞれの処理をしないようにifの処理を記載
    if (start.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateRunning();//stratしてからはstopのみ表示
    startTime = Date.now();
    countUp();
  });
  //stopボタンをクリックしたときの処理
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateStopped();//stopボタンを押したらsatrtとresetを表示
    clearTimeout(timeoutId);
    elapsedTime += Date.now() -startTime;//+=タイマーが走っていた時間を全て足し上げる
  });

  lap.addEventListener('click', () => {
    if (lap.classList.contains('inactive') === true) {
      return;
    }
      setButtonStateLaping();
      const newtime = document.createElement('p');
      const d = new Date(Date.now() - startTime + elapsedTime);//カウントアップのほうで経過時間も含めてタイマーに表示
      const m = String(d.getMinutes()).padStart(2, '0');
      const s = String(d.getSeconds()).padStart(2, '0');
      const ms = String(d.getMilliseconds()).padStart(3, '0');
      newtime.textContent = `${m}:${s}.${ms}`;
      laped.appendChild(newtime);
      reset.addEventListener('click', () => laped.removeChild(newtime));
  });
  //resetボタンをクリックしたときの処理
  reset.addEventListener('click',(newtime) => {
    if (reset.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateInitial();//resetを押したら最初の表示のstartのみ表示させる
    timer.textContent = '00:00.000';
    // laped.remove(newtime);
    elapsedTime = 0; //Reset を押したときには elapsedTime もリセットする
  });
}