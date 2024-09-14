import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

// 장바구니
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = document.querySelector(' .basket')//basket은 basketStarter안에 있으니 querySelector앞에 굳이 html을 뜻하는 document가 아니라 그냥 위에서 js의 변수로 선언해둔 basketStarterEl를 querySelector앞에 사용하는편이 빠름 그리고 이미 basketStarter 아래의 요소중에서 찾는것이므로 앞에 header를 붙이면 안됨 

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation()
  if (basketEl.classList.contains('show')) {
    hideBasket() // 사용자 함수 호출
    //hide
  }else {
    //show
    showBasket() // 사용자 함수 호출
  }

}) 
basketEl.addEventListener('click',function (event) {
  event.stopPropagation() // 여기부터 대를 끊겠다 라는 뜻. 즉 내부 영역을 클릭해도 상위 영역을 클릭했다고 되는 것을 여기서 부터 끊음 즉 basketEl를 클릭해도 baskelStarter을 클릭한거로 나오지는 않음
})

window.addEventListener('click', function () {
  hideBasket() // 사용자 함수 호출
  // 창을 닫기 위해 window를 클릭한다는 것은 이미 basket메뉴가 나왔다는 뜻이고
  // 즉 show가 붙어있는 상태라는 뜻이므로 없애주느 것만 만들어도 됨. 어차피 show가 다시 생기는건 바구니를 터치해야만 되고
  // 그것은 이미 위에 구현이 되어있음 여기까지만 구현했을때 바구니를 클릭해도 보이지 않는 것은 애초에 바구니도 window에 포함되므로
  // show를 지워버리기 때문. 이를 해결해주는 코드가 필요 이는 위의 이벤트 리스너에 event를 추가해서 해겨함 그러나
  //  장바구니 메뉴의 영역을 클릭해도 장바구니 스타터 영역의 안에 있어서 show가 한번 클릭되면서 remove되고 그러면서 보이지 않게 되는 문제가 있음 이를 해결해야 함

})

function showBasket() {
  basketEl.classList.add('show')
}
function hideBasket() {
  basketEl.classList.remove('show')
}

// 검색
const headerEl  = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]
const searchInputEl = searchWrapEl.querySelector('input')

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add("searching")
  document.documentElement.classList.add('fixed')
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function (el,index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  setTimeout(function () {
    searchInputEl.focus()
  }, 950)
  
}
function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function (el,index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse() //위에서 리버스 해줬으므로 다시 리버스해줘서 반복적으로 정상적인 사용을 가능하게 함
  searchInputEl.value = ''
}

// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return
    }/* !는 부정연산자로 소괄호 안의 코드를 해석하자면 false일때 작동하는 것을 뜻함 */
    entry.target.classList.add('show')
  })
})

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) {
  io.observe(el)
})

// 비디오 재생!
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () {
  video.play()
  playBtn.classList.add('hide') /* 재생버튼을 누르면 재생버튼을 안보이게 하고 재생버튼을 보여주느라 가렸던 멈춤 버튼을 보이게함 */
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function () {
  video.pause()
  pauseBtn.classList.add('hide')/* 멈춤버튼을 누르면 멈춤버튼을 안보이게 하고 멈춤버튼을 보여주느라 가렸던 재생버튼을 보이게함 */
  playBtn.classList.remove('hide')
})

// 당신에게 맞는 iPad는? 랜더링!
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function(ipad) {
  const itemEl = document.createElement('div') 
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color:${color};"></li>`
  })

  itemEl.innerHTML = /* HTML */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>

  `

  itemsEl.append(itemEl)
})


const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function(map) {
    mapList +=/* HTML */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* HTML */ `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})


const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()




















// 공지사항
const gonggiEl = document.querySelector('.popup')
const gonggiBtnEl = gonggiEl.querySelector('.check')

gonggiBtnEl.addEventListener('click', function () {
  gonggiEl.classList.add('hide')
})


