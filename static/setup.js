import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
// import { BrowserClient, defaultStackParser, defaultIntegrations, makeFetchTransport } from "@sentry/browser";

Sentry.init({
  dsn: "XXXX",

  // Alternatively, use `process.env.npm_package_version` for a dynamic release version
  // if your build tool supports it.
  release: "my-project-name@2.3.12",
  debug: true,
  integrations: [
    new BrowserTracing({
      idleTimeout: 5000,
    }),
    //   {
    //   tracePropagationTargets: ["localhost", /^\//],
    // }
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const map = new ArcGISMap({
  basemap: "satellite",
});

const view = new MapView({
  map,
  constainer: "viewDiv",
  center: [-118, 34],
  zoom: 8,
});

view.when(() => {
  console.log("view ready");
});

// myUndefinedFunction();

// function makeHttpRequest() {
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1", true);
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       console.log("XHR successful:", xhr.responseText);
//     } else {
//       console.error("XHR failed:", xhr.status);
//     }
//   };
//   xhr.send();
// }

// // Event listener for page load
// document.addEventListener("DOMContentLoaded", function () {
//   // Your existing code...

//   // Make XMLHttpRequest during page load
//   makeHttpRequest();
// });

async function makeFetchRequest() {
  // const transaction = Sentry.startTransaction({
  //   name: "makeFetchRequest",
  //   op: "http.request",
  // });

  // const transaction = Sentry.getCurrentHub().getScope().getTransaction();
  // if (transaction) {
  //   const span = transaction.startChild({
  //     op: "encode",
  //     description: "parseAvatarImages",
  //   });

  console.log("before", Sentry.getCurrentHub().getScope().getTransaction());
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // transaction.finish();
      console.log("Fetch successful:", data);
      console.log("after", Sentry.getCurrentHub().getScope().getTransaction());
      // span.finish();
    })
    .catch((error) => {
      // transaction.finish();
      console.error("Fetch failed:", error.message);
      // span.finish();
    });
  // }
  // try {
  //   const response = await fetch(
  //     "https://jsonplaceholder.typicode.com/todos/1"
  //   );
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }

  //   const data = await response.json();
  //   console.log("Fetch successful:", data);
  //   console.log("after", Sentry.getCurrentHub().getScope().getTransaction());
  // } catch (error) {
  //   console.error("Fetch failed:", error.message);
  // }
}

// Event listener for page load
document.addEventListener("DOMContentLoaded", function () {
  // Your existing code...

  // Make Fetch request during page load
  makeFetchRequest();
});

try {
  aFunctionThatMightFail();
} catch (err) {
  Sentry.captureException(err);
}

Sentry.onLoad(function () {
  Sentry.captureMessage("Something went wrong");
  myUndefinedFunction();
});

console.log("Hello World!!!");

const client = new BrowserClient({
  dsn: "https://2cd027e0527049719a970a5235a4c50d@o1145044.ingest.sentry.io/6758532",
  transport: makeFetchTransport,
  stackParser: defaultStackParser,
  integrations: defaultIntegrations,
});

client.captureException(new Error("example"));
