import axios from "axios";
import { useState } from 'react'

import * as S from "./style.js";

export default function Main() {
  const [textValue, setTextValue] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();
    let file = e.target.uploadFile.files[0];
    let formData = new FormData();
    formData.append("file", file);

    try {
      const request = await axios.post(
        "https://projeto-leitordenotas.herokuapp.com/ler-nota",
        formData
      );
      setTextValue(request.data)
    } catch (e) {
      alert("Ocorreu algum erro ao processar seu pedido");
    }
  }

  function Teste() {
    if(textValue === '') {
      return <></>
    } else {
      return <div dangerouslySetInnerHTML={{__html: textValue}}></div>
    }
  }

  return (
    <S.ContainerMain>
      <S.Wrapper>
        <S.Form onSubmit={(e) => handleSubmit(e)}>
          <S.FileInput name="uploadFile" type="file" accept=".pdf" required />
          <S.SendButton>
            <p>Converter Nota!</p>
          </S.SendButton>
          <Teste />

        </S.Form>
      </S.Wrapper>
    </S.ContainerMain>
  );
}
