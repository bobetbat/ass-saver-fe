import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import './bg.css'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// Register service worker
serviceWorkerRegistration.register({
  onSuccess: registerPush,
  onUpdate: registerPush,
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function registerPush(registration: ServiceWorkerRegistration) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      subscribeUserToPush(registration);
    }
  });
}

function urlB64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function subscribeUserToPush(registration: ServiceWorkerRegistration) {
  const applicationServerKey = urlB64ToUint8Array('BAXeqIBWzcNGqkgsRyztAi98ssWc97xz6d5TQj9dSywqLH8Snv1zy3OMxUjgbyhxYGV-gWoFFX8N8CYgKa5r-Ok');
  registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  }).then(subscription => {
    console.log('User is subscribed:', subscription);
    // Send subscription to your server
    sendSubscriptionToServer(subscription);
  }).catch(err => {
    console.log('Failed to subscribe user: ', err);
  });
}

function sendSubscriptionToServer(subscription: PushSubscription) {
  // Send the subscription object to your server
  fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to store the subscription on server');
    }
  }).catch(error => {
    console.error('Error storing subscription on server:', error);
  });
}