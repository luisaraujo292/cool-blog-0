//Para permitir a criação de novas postagens, incorporaremos um formulário simples que consiste em alguns campos de entrada e um botão de envio.

//O useRef é um hook fornecido pelo React que oferece uma maneira de acessar e interagir com o DOM (Document Object Model) diretamente em componentes de função. Ele é frequentemente usado para referenciar elementos do DOM, mas também pode ser útil para armazenar e acessar valores mutáveis que persistem através das renderizações do componente.

//O código acima é um componente React em Next.js chamado CreatePostPage. Incluímos a diretiva "use client" na parte superior do arquivo para indicar que é um componente cliente em Next.js. Em seguida, ele importa os ganchos useRef e useState da biblioteca React. Depois disso, a função do componente CreatePostPage é definida. Dentro dele, diversas variáveis ​​de estado e referências useRef são declaradas para armazenar os valores inseridos nas entradas do formulário. A função updatePostUrl é definida e acionada quando o evento onChange ocorre no campo de entrada do slug. Ele atualiza o estado do slugLabel com o valor atual do campo de entrada do slug. Em seguida, é definida a função submitPost, que é chamada quando o formulário é enviado. Impede o comportamento padrão de envio de formulário. Dentro de submitPost, um objeto formData é criado, capturando os valores inseridos nas entradas do formulário. Uma solicitação HTTP é feita para o endpoint da API "/api/admin/create-post" usando fetch() com o objeto formData no corpo da solicitação como uma string JSON. A resposta é tratada por meio de promessas. A primeira resposta é convertida em JSON usando o método data.json(). Em seguida, para confirmar o sucesso da adição de uma nova postagem, uma caixa de diálogo com a mensagem "Adicionou uma nova postagem com sucesso" será exibida se a propriedade "status" do objeto "resposta" for igual a "CONSTANTS.RESPONSE_STATUS.OK".
'use client';

import { useRef, useState } from 'react';
import CONSTANTS from '@/app/constants';

export default function CreatePostPage() {
  const [slugLabel, setSlugLabel] = useState('<slug>'); 
  const slugInputRef = useRef();
  const titleInputRef = useRef();
  const thumbnailInputRef = useRef();
  const excerptInputRef = useRef();
  const contentInputRef = useRef();

  function updatePostUrl() {
    setSlugLabel(slugInputRef.current.value);
  }

  function submitPost(event) {
    event.preventDefault();

    const formData = {
      slug: slugInputRef.current.value,
      title: titleInputRef.current.value,
      thumb: thumbnailInputRef.current.value,
      excerpt: excerptInputRef.current.value,
      content: contentInputRef.current.value,
    };

    fetch('/api/admin/create-post', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (response.status === CONSTANTS.RESPONSE_STATUS.OK) {
          alert('Added one new post successfully.');
        } else {
          alert('Internal Server Error');
        }
      });
  }

  return (
    <>
      <h1>Create New Post</h1>
      <form onSubmit={submitPost}>
        <div className="row">
          <div className="col-label">
            <label htmlFor="slug">Slug</label>
          </div>
          <div className="col-input">
            <input type="text" id="slug" name="slug" onChange={updatePostUrl} ref={slugInputRef} />
            <div>Post&apos;s url: /posts/{slugLabel}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="title">Title</label>
          </div>
          <div className="col-input">
            <input type="text" id="title" name="title" ref={titleInputRef} />
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="thumb">Thumbnail</label>
          </div>
          <div className="col-input">
            <input type="text" id="thumb" name="thumb" ref={thumbnailInputRef} />
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="excerpt">Excerpt</label>
          </div>
          <div className="col-input">
            <textarea id="excerpt" name="excerpt" rows="2" ref={excerptInputRef}></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="content">Content</label>
          </div>
          <div className="col-input">
            <textarea id="content" name="content" rows="8" ref={contentInputRef}></textarea>
          </div>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}