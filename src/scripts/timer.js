/**
 * Добавить возможность самостоятельно назначать время + 
 * добавить перехватчик события от кнопки
 * Также сделать запуск таймера по кнопке, а не автоматически
 * 
 * как оказалось, инпут с type=time записывает время в формате
 * час:минута, а не минута:секунда, как мне необходимо
 * Надо переиграть это
 */

let TIME_LIMIT = 0;
let timePassed = 0;
let timeAdd = 0;
let timeAddPassed = 0;
let timeAddLeft = timeAdd;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let timerAddInterval = null;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <div class="base-timer__label">
    <span class="base-timer__text">Время работы:</span>
    <span id="base-timer-label" class="base-timer__text">${formatTime(
      timeLeft
    )}</span>
  </div>
  <div class="add-timer__label">
    <span class="add-timer__text">Время отдыха:</span>
    <span id="add-timer-label" class="add-timer__text">${formatTime(timeAdd)}</span>
  </div>
</div>
`;

function onTimesUp() {
    clearInterval(timerInterval);
}

function onTimesAddUp() {
    clearInterval(timerAddInterval);
}

function startTimer() {
    clearTimer();
    let mainTime, addTime;
    let doc = document.querySelectorAll('input');
    for (const d of doc) {
        if (d.checked) {
            if (d.value == 'my_format') {
                let tempMain = document.getElementById('minutes_of_work').value.split(':');
                let tempAdd = document.getElementById('minutes_of_rest').value.split(':');
                mainTime = tempMain[0] * 60 + tempMain[1];
                addTime = tempAdd[0] * 60 + tempAdd[1];
            } else {
                [mainTime, addTime] = d.value.split('/');
                mainTime *= 60;
                addTime *= 60;
            }
        }
    }

    if (mainTime == null) {
        alert('Введите время!');
        return;
    }

    document.getElementById('startButton').style.display = 'none';
    document.getElementById('stopButton').style.display = 'block';

    TIME_LIMIT = mainTime;
    timeAdd = addTime;
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
        );
        document.getElementById('add-timer-label').innerHTML = formatTime(timeAdd);
        console.log(timeLeft);
        if (timeLeft === 0) {
            onTimesUp();
            startRelax();

        }
    }, 1000);

}



function startRelax() {

    timerAddInterval = setInterval(() => {
        timeAddPassed = timeAddPassed += 1;
        timeAddLeft = timeAdd - timeAddPassed;
        document.getElementById('add-timer-label').innerHTML = formatTime(timeAddLeft);

        if (timeLeft === 0) {
            onTimesAddUp();
            startTimer();
        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function clearTimer(){
  document.getElementById('startButton').style.display = 'block';
  document.getElementById('stopButton').style.display = 'none';
  clearInterval(timerInterval);
  clearInterval(timerAddInterval);
  TIME_LIMIT = 0;
  timePassed = 0;
  timeAdd = 0;
  timeAddPassed = 0;
  timeAddLeft = timeAdd;
  timeLeft = TIME_LIMIT;
  document.getElementById("base-timer-label").innerHTML = formatTime(
    timeLeft
);
document.getElementById('add-timer-label').innerHTML = formatTime(timeAdd);
}