module.exports = function (time) {
  let sec_num = parseInt(time, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;

  hours = hours > 10 ? hours : '0' + hours;
  minutes = minutes > 10 ? minutes : '0' + minutes;
  seconds = seconds > 10 ? seconds : '0' + seconds;

  return `${hours}:${minutes}:${seconds}`;
};
