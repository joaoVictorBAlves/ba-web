"use client";

import { useCallback } from "react";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-react-ui";
import { Survey } from "survey-react-ui";
import api from "../../services/api";

const surveyJson = {
  title: "Teste",
  elements: [
    {
      name: "FirstName",
      title: "Enter your first name:",
      type: "text",
    },
    {
      name: "LastName",
      title: "Enter your last name:",
      type: "text",
    },
    {
      name: "Resposta",
      title: "Sua resposta",
      type: "text",
    },
  ],
};

const surveySchema = {
  name: "Teste",
  json: surveyJson,
};

function App() {
  const survey = new Model(surveyJson);
  const alertResults = useCallback(async (sender: any) => {
    try {
      const response = await api.post(
        "/editor/form",
        JSON.stringify(surveyJson),
        {
          withCredentials: true,
          // headers: {
          //   'Access-Control-Allow-Origin': '*',
          //   'Content-Type': 'application/json'
          // }
        }
      );
    } catch (error: any) {
      console.error(
        "Erro ao enviar formulário",
        error.response?.data || error.message
      );
      throw error;
    }
    const results = JSON.stringify(sender.data);
  }, []);

  survey.onComplete.add(alertResults);
  return <Survey model={survey} />;
}

export default App;
