import { createAutoComplete } from "../../auto-complete/index";

import { Results } from "./Results";

import data from "./services/getData";

import "./styles/style.scss";

const results: Results = new Results(createAutoComplete, data);
results.getInfo(createAutoComplete, data);
