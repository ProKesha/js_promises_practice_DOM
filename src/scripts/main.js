'use strict';

function showNotification(message, isError = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = message;
  div.classList.add(isError ? 'error' : 'success');
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (event.button === 0) {
      resolve('First promise was resolved on a left click in the document');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
    document.removeEventListener('click', onClick);
  }, 3000);
});

firstPromise
  .then((message) => showNotification(message))
  .catch((error) => showNotification(error, true));

const secondPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);
});

secondPromise.then((message) => showNotification(message));

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve(
        'Third promise was resolved after both left and right clicks happened',
      );
    }
  });
});

thirdPromise.then((message) => showNotification(message));
