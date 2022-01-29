import axios from "axios";
import store from "../store";

store.subscribe((mutation) => {
  switch (mutation.type) {
    case "auth/SET_TOKEN":
      if (mutation.payload) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${mutation.payload}`;
        localStorage.setItem("token", mutation.payload);
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("token");
      }
      break;
    case "options/STORE_OPTIONS":
      if (mutation.payload) {
        localStorage.setItem("options", JSON.stringify(mutation.payload));
      }
      break;
    case "teams/STORE_TEAMS":
      if (mutation.payload) {
        localStorage.setItem("teams", JSON.stringify(mutation.payload));
      }
      break;
  }
});
