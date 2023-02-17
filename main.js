//--------------- APIs --------------- //

//--------------- API GITHUB --------------- //

// Seleciona o elemento do HTML onde o número de seguidores será exibido
const followerCountElement = document.getElementById('follower-count');

// Define a chave de API
const apiKey = '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';

// Define as opções da requisição, incluindo a chave de API no cabeçalho de autorização
const requestOptions = {
  headers: {
    'Authorization': `Token ${apiKey}`
  }
};

// Faz a requisição à API do GitHub para obter o número de seguidores
fetch('https://api.github.com/users/DaniloMartinezz', requestOptions)
  .then(response => response.json())
  .then(data => {
    // Extrai o número de seguidores do objeto retornado pela API
    const followerCount = data.followers;

    // Exibe o número de seguidores na página
    followerCountElement.textContent = `${followerCount}`;
  })
  .catch(error => {
    // Exibe uma mensagem de erro caso ocorra algum problema na requisição
    followerCountElement.textContent = `Não foi possível carregar o número de seguidores. Erro: ${error}`;
  });

//--------------- API GITHUB FINAL --------------- //

//--------------- API TWITCH --------------- //

  // insira sua ID do usuário da Twitch aqui
const userId = "martinez_dev";

// crie a URL da API da Twitch
const url = `https://api.twitch.tv/helix/users/follows?to_id=${userId}`;

// insira sua Client ID da Twitch aqui
const clientId = "#";

// faça uma solicitação GET para a API da Twitch
fetch(url, {
  headers: {
    "Client-ID": clientId
  }
})
  .then(response => response.json())
  .then(data => {
    // obtenha o número de seguidores do objeto de resposta
    const followers = data.total;

    // adicione o número de seguidores ao elemento HTML
    document.getElementById("followers-twitch").innerHTML = ` ${followers}`;
  });

//--------------- API TWITCH FINAL --------------- //










//--------------- ANIMAÇÃO MAIN --------------- //
function fitElementToParent(el, padding) {
    var timeout = null;
    function resize() {
        if (timeout) clearTimeout(timeout);
        anime.set(el, { scale: 1 });
        var pad = padding || 0;
        var parentEl = el.parentNode;
        var elOffsetWidth = el.offsetWidth - pad;
        var parentOffsetWidth = parentEl.offsetWidth;
        var ratio = parentOffsetWidth / elOffsetWidth;
        timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
    }
    resize();
    window.addEventListener('resize', resize);
}

var sphereAnimation = (function () {

    var sphereEl = document.querySelector('.sphere-animation');
    var spherePathEls = sphereEl.querySelectorAll('.sphere path');
    var pathLength = spherePathEls.length;
    var hasStarted = false;
    var aimations = [];

    fitElementToParent(sphereEl);

    var breathAnimation = anime({
        begin: function () {
            for (var i = 0; i < pathLength; i++) {
                aimations.push(anime({
                    targets: spherePathEls[i],
                    stroke: { value: ['rgba(255,75,75,1)', 'rgba(80,80,80,.35)'], duration: 500 },
                    translateX: [2, -4],
                    translateY: [2, -4],
                    easing: 'easeOutQuad',
                    autoplay: false
                }));
            }
        },
        update: function (ins) {
            aimations.forEach(function (animation, i) {
                var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
                animation.seek(animation.duration * percent);
            });
        },
        duration: Infinity,
        autoplay: false
    });

    var introAnimation = anime.timeline({
        autoplay: false
    })
        .add({
            targets: spherePathEls,
            strokeDashoffset: {
                value: [anime.setDashoffset, 0],
                duration: 3900,
                easing: 'easeInOutCirc',
                delay: anime.stagger(190, { direction: 'reverse' })
            },
            duration: 2000,
            delay: anime.stagger(60, { direction: 'reverse' }),
            easing: 'linear'
        }, 0);

    var shadowAnimation = anime({
        targets: '#sphereGradient',
        x1: '25%',
        x2: '25%',
        y1: '0%',
        y2: '75%',
        duration: 30000,
        easing: 'easeOutQuint',
        autoplay: false
    }, 0);

    function init() {
        introAnimation.play();
        breathAnimation.play();
        shadowAnimation.play();
    }

    init();

})();



// obtenha o elemento do botão
const button = document.querySelector("button");

// adicione um event listener para o clique do botão
button.addEventListener("click", () => {
    // obtenha a próxima seção
    const nextSection = document.querySelector("#next-section");

    // desça suavemente para a próxima seção
    nextSection.scrollIntoView({
        behavior: "smooth"
    });
});
//--------------- ANIMAÇÃO MAIN FINAL --------------- //





//--------------- COUNTDOWN --------------- //

// Define as configurações para cada contador
const counters = [
  { id: 'counter-1', end: 1088, interval: 5 },
  { id: 'counter-2', end: 10, interval: 50 },

  { id: 'counter-5', end: 4, interval: 80 },
  { id: 'counter-6', end: 21, interval: 110 },
  { id: 'counter-7', end: 54, interval: 135 },
  { id: 'counter-8', end: 4, interval: 60 },
  { id: 'counter-9', end: 20, interval: 90 },
  { id: 'counter-10', end: 10, interval: 150 },
  { id: 'counter-11', end: 544, interval: 30 },
  { id: 'counter-12', end: 5, interval: 70 }
];

// Define a função que atualiza o contador de uma div específica
function updateCounter(id, end) {
  // Obtém a div específica e o contador atual
  const counter = document.getElementById(id);
  let count = parseInt(counter.innerHTML);
  
  // Atualiza o contador se ainda não tiver chegado ao valor final
  if (count < end) {
    count++;
    counter.innerHTML = count;
  }
}

// Inicia a animação para cada div
for (let i = 0; i < counters.length; i++) {
  const counter = counters[i];
  setInterval(() => updateCounter(counter.id, counter.end), counter.interval);
}