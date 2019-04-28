(async () => {
  const data = await fetch('bilibili-top-100.json')
    .then(res => res.json())
  data.forEach(data => {
    const div = document.createElement('div');
    const html = `
      <div class="user">
      <a href="${data.space}">
        <img src="${'img/' + data.img.split('/').pop()}">
        <br>
        <span class="name">${data.name}</span>
      </a>
      </div>
      <p>
        ${data.info}
      </p>
    `
    div.innerHTML = html;
    document.body.appendChild(div);
  })
})()
