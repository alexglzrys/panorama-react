import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import toastr from "toastr";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [dataFilter, setDataFilter] = useState({});
  useEffect(() => {
    fetchData();
  }, []);

  const API_URL = "https://jsonplaceholder.typicode.com";

  // Consultar todos los Post, y asociarlos con el nombre de su respectivo autor (usuario)
  const fetchData = async () => {
    try {
      const responsePosts = await fetch(`${API_URL}/posts`);
      const dataPosts = await responsePosts.json();
      const responseUsers = await fetch(`${API_URL}/users`);
      const dataUsers = await responseUsers.json();
      // Por cada post, buscamos su respectivo autor, y retornamos un objeto con la nueva información
      const data = dataPosts.map((post) => {
        const user = dataUsers.find((user) => {
          return user.id === post.userId;
        });
        return { ...post, username: user.name };
      });
      setPosts([...data]);
      generateDataFiltering(dataUsers);
    } catch (error) {
      toastr.error(
        "Ha sucedido un error inesperado al tratar de establecer comunicación con el servidor, intente más tarde",
        "Advertencia"
      );
    }
  };

  // Generador de objeto para el filtrado de datos (selección por nombre de usuario)
  const generateDataFiltering = (users) => {
    const object = {};
    users.forEach((user) => {
      Object.assign(object, { [user.id]: user.name });
    });
    setDataFilter({ ...object, 11: "Root" });
  };

  // Eliminar un conjunto de posts seleccionados
  const deletePosts = async (postsToDelete) => {
    try {
      let dataDeleted = [...posts];
      for (const post of postsToDelete) {
        const response = await fetch(`${API_URL}/posts/${post.id}`, {
          method: "DELETE",
        });
        await response.json();
        let index = dataDeleted.map((obj) => obj.id).indexOf(post.id);
        dataDeleted.splice(index, 1);
      }
      setPosts(dataDeleted);
      toastr.warning(
        "Los Posts seleccionados se han eliminado satisfactoriamente del sistema",
        "Aviso importante"
      );
    } catch (error) {
      toastr.error(
        "Ha sucedido un error inesperado al tratar de elminar el Post, intente más tarde",
        "Advertencia"
      );
    }
  };

  // Eliminar un Post
  const deletePost = async (oldData) => {
    try {
      const response = await fetch(`${API_URL}/posts/${oldData.id}`, {
        method: "DELETE",
      });
      await response.json();
      const dataDelete = [...posts];
      const index = oldData.tableData.id;
      dataDelete.splice(index, 1);
      setPosts([...dataDelete]);
      toastr.warning(
        "El Post seleccionado se ha eliminado satisfactoriamente del sistema",
        "Aviso importante"
      );
    } catch (error) {
      toastr.error(
        "Ha sucedido un error inesperado al tratar de eliminar el Post, intente más tarde",
        "Advertencia"
      );
    }
  };

  // Actualizar un post
  const updatePost = async (newData, oldData) => {
    try {
      const response = await fetch(`${API_URL}/posts/${oldData.id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: oldData.id,
          title: newData.title,
          body: oldData.body,
          userId: oldData.userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      const dataUpdate = [...posts];
      const index = oldData.tableData.id;
      dataUpdate[index] = { ...data, username: oldData.username };
      setPosts([...dataUpdate]);
      toastr.info(
        "El Post seleccionado se ha actualizado satisfactoriamente en el sistema",
        "Aviso importante"
      );
    } catch (error) {
      toastr.error(
        "Ha sucedido un error inesperado al tratar de actualizar el Post, intente más tarde",
        "Advertencia"
      );
    }
  };

  // Crear un nuevo Post
  const createPost = async (newData) => {
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        body: JSON.stringify({
          title: newData.title,
          body: "Lorem ipsum...",
          userId: 11,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      setPosts([...posts, { ...data, username: "Root", id: posts.length + 1 }]);
      toastr.success(
        "El Post se ha registrado satisfactoriamente en el sistema",
        "Aviso importante"
      );
    } catch (error) {
      toastr.error(
        "Ha sucedido un error inesperado al tratar de registrar el Post, intente más tarde",
        "Advertencia"
      );
    }
  };

  const columns = [
    {
      title: "Post Id",
      field: "id",
      filtering: false,
      type: "numeric",
      align: "left",
      width: 150,
      editable: "never",
    },
    {
      title: "User",
      field: "userId",
      align: "left",
      width: 300,
      editable: "never",
      lookup: dataFilter,
    },
    {
      title: "Title",
      field: "title",
      filtering: false,
      align: "left",
      width: "auto",
    },
    {
      title: "Body",
      field: "body",
      hidden: true,
    },
  ];

  const options = {
    exportButton: true,
    filtering: true,
    actionsColumnIndex: -1,
    selection: true,
    debounceInterval: 800,
  };

  const editable = {
    onRowAdd: async (newData) => {
      await createPost(newData);
    },
    onRowUpdate: async (newData, oldData) => {
      await updatePost(newData, oldData);
    },
    onRowDelete: async (oldData) => {
      await deletePost(oldData);
    },
  };

  const actions = [
    {
      icon: () => <DeleteForeverIcon />,
      tooltip: "Remove Selected Posts",
      onClick: (event, rowData) => {
        deletePosts(rowData);
      },
    },
  ];

  return (
    <div className="Posts">
      <MaterialTable
        columns={columns}
        data={posts}
        options={options}
        actions={actions}
        editable={editable}
        title="Posts"
      />
    </div>
  );
};
export default Posts;
