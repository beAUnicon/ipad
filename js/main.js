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
searchCloserEl.addEventListener('click', function (event) {
  event.stopPropagation() /* 이벤트 버블링을 끊어줌 그리하여 x버튼을 클릭한것이 textfield를 클릭한것이 아니게 됨 */
  hideSearch()
  /* 데스크탑 모드에서 textfield 안에 있는 x 버튼을 눌렀을때 이벤트 버블링 때문에 textfiled가 눌러진것으로 처리되고 그로인해 그상태에서 모바일 모드로 바꾸면 처음부터 textfiled가 눌린 즉 searching--mobile모드로 시작되게 됨 그러므로 처번에 살펴봤던 이벤트 버블링을 원하는 위치에서 스톱프로파게이션을 사용하여 적절히 끊어줌. */
})
searchShadowEl.addEventListener('click', hideSearch) 

function showSearch() {
  headerEl.classList.add("searching")
  stopScroll()
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
  playScroll()
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function (el,index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse() //위에서 리버스 해줬으므로 다시 리버스해줘서 반복적으로 정상적인 사용을 가능하게 함
  searchInputEl.value = '' // hide 할때 input안의 value 즉 글자를 빈문자로 초기화 하는 이유는 다시 켰을떄 이전에 쳤던 값들이 남아있을수있기 떄문이다.
}
function playScroll() {
  document.documentElement.classList.remove('fixed') // css에 html에 fixed가 붙어있으면 스크롤이 보이지 않도록 설정되어있음.
}
function stopScroll() {
  document.documentElement.classList.add('fixed')
}

// 헤더 메뉴 토글!
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', function () {
  if (headerEl.classList.contains('menuing')) {
    headerEl.classList.remove('menuing')
    searchInputEl.value = ''
    playScroll()
  }else {
    headerEl.classList.add('menuing')
    stopScroll()
  }
})

// 헤더 검색!
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click', function () {
  headerEl.classList.add('searching--mobile')
  searchInputEl.focus() // 입력란을 눌렀을때 포커스가 되도록 함.
})
searchCancelEl.addEventListener('click', function () {
  headerEl.classList.remove('searching--mobile')
})

//
window.addEventListener('resize', function () { /* 사이즈가 바뀌었을때 */
  if (window.innerWidth <= 740) { /* 만약 innerWidth가 740이하라면 header에서 searching 클래스 제거 */
    headerEl.classList.remove('searching')
  } else {
    headerEl.classList.remove('searching--mobile') /* else는 if 조건이 아닌 모든 상황을 뜻하는데 if는 740이하 일때이므로 740이상의 경우 즉 모바일 버전이 아닌경우는 searching--mobilie을 header에서 없애줌 */
  }
})


//
const navEl = document.querySelector('nav')
const navMenuToggleEl = navEl.querySelector('.menu-toggler')
const navMenuShadowEl = navEl.querySelector('.shadow')

navMenuToggleEl.addEventListener('click', function () {
  if (navEl.classList.contains('menuing')) { // nav 태그에 menuing 클래스를 추가해서 메뉴를 보이게 혹은 보이지 않게 하는 방법이 있다.
     //  mening 클래스가 있다면 제거하고 
     hideNavMenu()
  } else {
    showNavMenu()
  }
})
// nav를 클릭했을때에는 버블링을 차단하여 window를 클릭한것이 아니도록 함
navEl.addEventListener('click', function (event) {
  event.stopPropagation() /* nav영역을 클릭했을때에는 끊어서 window를 클릭한것이 아니도록 하여서 nav를 클릭했을때 버블링으로 인해서 보이지 않게 되지 않도록 함 */
})
// 배경을 클릭했을때 메뉴를 취소한다.
navMenuShadowEl.addEventListener('click', hideNavMenu)

// 모든 곳을 클릭했을때 메뉴를 숨긴다.
window.addEventListener('click', hideNavMenu)

function showNavMenu() {
  navEl.classList.add('menuing')
}
function hideNavMenu() {
  navEl.classList.remove('menuing')
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
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})


const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()



const mapEls = document.querySelectorAll('footer .navigations .map')
mapEls.forEach(function (el) {
  const h3El = el.querySelector('h3') //가져온 el에서 h3부분을 찾아서 저장 왜냐하면 ul을 숨기고 있다가 h3를 클릭하면 나오게 하므로 h3을 클릭했을때 클래스를 추가하는 코드를 짜기 위해 h3를 찾아둬야함
  h3El.addEventListener('click', function () {
    el.classList.toggle('active') /* toggle은 해당 클래스가 없으면 해당하는 클래스를 add해주고 해당 클래스가 있으면 remove해줌 즉 자동으로 add와 remove의 역활을 같이 함ㅜ */
  })
})















// 공지사항
const gonggiEl = document.querySelector('.popup')
const gonggiBtnEl = gonggiEl.querySelector('.check')

gonggiBtnEl.addEventListener('click', function () {
  gonggiEl.classList.add('hide')
  gonggiEl.classList.add('clear')
})



