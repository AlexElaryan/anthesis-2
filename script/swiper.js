const paginationEl = document.querySelector('.pag-numbers');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

if (!paginationEl) {
  console.error('Pagination element .pag-numbers not found');
}

function formatNumber(n) {
  return n < 10 ? `0${n}` : String(n);
}

function getOriginalSlides(swiper) {
  return Array.from(swiper.el.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)'));
}

function getTotalSlides(swiper) {
  return getOriginalSlides(swiper).length;
}

function getActiveNumber(swiper) {
  return swiper.params.loop ? swiper.realIndex + 1 : swiper.activeIndex + 1;
}

function goToNumber(swiper, number) {
  const original = getOriginalSlides(swiper);
  const targetOriginalEl = original[number - 1];
  if (!targetOriginalEl) return;

  const allSlides = Array.from(swiper.slides);
  const indexInAll = allSlides.indexOf(targetOriginalEl);

  if (indexInAll !== -1) {
    swiper.slideTo(indexInAll);
  } else if (typeof swiper.slideToLoop === 'function') {
    swiper.slideToLoop(number - 1);
  } else {
    const offset = swiper.params.loop ? (swiper.loopedSlides || 0) : 0;
    swiper.slideTo(number - 1 + offset);
  }
}

function createNumberSpan(number, isActive, swiper) {
  const span = document.createElement('span');
  span.className = 'pag-number' + (isActive ? ' active' : '');
  span.dataset.num = String(number);
  span.textContent = formatNumber(number);
  span.style.cursor = 'pointer';
  span.addEventListener('click', () => goToNumber(swiper, number));
  return span;
}

function createDots() {
  const dots = document.createElement('span');
  dots.className = 'pag-dots';
  dots.textContent = '...';
  return dots;
}

function buildPagination(swiper) {
  const total = getTotalSlides(swiper);
  const active = getActiveNumber(swiper);
  paginationEl.innerHTML = '';

  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      paginationEl.appendChild(createNumberSpan(i, i === active, swiper));
    }
    return;
  }

  let start, end;
  if (active <= 3) {
    start = 1;
    end = 3;
  } else if (active >= total - 2) {
    start = Math.max(total - 2, 1);
    end = total;
  } else {
    start = Math.max(active - 1, 1);
    end = active;
  }

  for (let i = start; i <= end; i++) {
    paginationEl.appendChild(createNumberSpan(i, i === active, swiper));
  }

  if (end < total - 1) {
    paginationEl.appendChild(createDots());
  }

  if (end < total) {
    paginationEl.appendChild(createNumberSpan(total, total === active, swiper));
  }
}

const swiper = new Swiper('.project-swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  on: {
    init(swiper) {
      buildPagination(swiper);
    },
    slideChange(swiper) {
      buildPagination(swiper);
    },
    imagesReady(swiper) {
      buildPagination(swiper);
    }
  }
});

if (prevBtn) prevBtn.addEventListener('click', () => swiper.slidePrev());
if (nextBtn) nextBtn.addEventListener('click', () => swiper.slideNext());
