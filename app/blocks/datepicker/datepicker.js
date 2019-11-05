let picker = new Pikaday({ 
  field: document.querySelector('[data-js=datepicker]'),
  format: 'D/M/YYYY',
  toString(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  },
    i18n           : {
      previousMonth : 'Предыдущий месяц',
      nextMonth     : 'Следующий месяц',
      months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
      weekdays      : ['Воскресенье', 'Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
      weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
  }
});