import {getValue,onClick,setValue} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js";
import { validatePhoneNumber } from "https://cdn.jsdelivr.net/gh/jscroot/validate@0.0.2/croot.js";
import { getCookie } from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import { addCSSIn } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {postFileWithHeader,postJSON,deleteJSON,putJSON,getJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/api.js";
import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import { id, backend } from "../../../url/config.js";
import { loadScript } from "../../../controller/main.js";
import { truncateText, addRevealTextListeners } from "../../utils.js";

let dataTable;

export async function main() {
  await addCSSIn(
    "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css",
    id.content
  );
  await addCSSIn("assets/css/custom.css", id.content);
  await loadScript("https://code.jquery.com/jquery-3.6.0.min.js");
  await loadScript("https://cdn.datatables.net/2.0.8/js/dataTables.min.js");

  getJSON(
    backend.project.data,
    "login",
    getCookie("login"),
    getResponseFunction
  );
}

function reloadDataTable() {
  if (dataTable) {
    dataTable.destroy(); // Destroy the existing DataTable
  }
  getJSON(
    backend.project.data,
    "login",
    getCookie("login"),
    getResponseFunction
  );
}

function getResponseFunction(result) {
  console.log(result);
  const tableBody = document.getElementById("webhook-table-body");
  if (tableBody) {
    if (result.status === 200) {
      // Clear existing table body content to avoid duplication
      tableBody.innerHTML = "";

      // Destroy existing DataTable instance if it exists
      if ($.fn.DataTable.isDataTable("#myTable")) {
        $("#myTable").DataTable().destroy();
      }

      // Menambahkan baris untuk setiap webhook dalam data JSON
      result.data.forEach((project) => {
        const truncatedDescription = truncateText(project.description, 50);

        // Gabungkan nama anggota dalam satu kolom dengan numbering dan tambahkan tombol Add Member
        let membersHtml =
          project.menu && project.menu.length > 0
            ? project.menu
                .map(
                  (mn, index) =>
                    `
                    <div class="tag is-success mb-3">
                       ${index + 1}. ${mn.name} - ${mn.price}
                      <button class="delete is-small removeMemberButton" data-project-name="${
                        project.name
                      }" data-menu-id="${
                      mn.id
                    }"></button>
                    </div>
                  `
                )
                .join("<br>") // Tambahkan <br> untuk membuat baris baru untuk setiap anggota
            : "";
        membersHtml += `
          <button class="button box is-primary is-small btn-flex addMemberButton" data-project-id="${project._id}">
            <i class="bx bx-plus"></i>
            Add menu
          </button>`;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${project.name}</td>
          <td>${membersHtml}</td>
          <td class="has-text-justified">
            ${truncatedDescription}
            <span class="full-text" style="display:none;">${project.description}</span>
          </td>
          <td class="has-text-centered">
            <button class="button is-danger removeProjectButton" data-project-name="${project.name}">
              <i class="bx bx-trash"></i>          
            </button>
            <button class="button is-warning editProjectButton" data-project-id="${project._id}" data-project-name="${project.name}" data-project-title="${project.title}" data-project-repoorg="${project.repoorg}" data-project-repologname="${project.repologname}" data-project-description="${project.description}">
              <i class="bx bx-edit"></i>
            </button>
          </td>
        `;
        tableBody.appendChild(row);
      });

      // Initialize DataTable after populating the table body
      dataTable = $("#myTable").DataTable({
        responsive: true,
        autoWidth: false,
      });

      addRevealTextListeners();
      addMemberButtonListeners(); //  event listener tambah member
      addRemoveMemberButtonListeners(); //  event listener hapus member
      addRemoveProjectButtonListeners();
      addEditProjectButtonListeners(); //  event listener edit project
    } else {
      Swal.fire({
        icon: "error",
        title: result.data.status,
        text: result.data.response,
      });
    }
  } else {
    console.error('Element with ID "webhook-table-body" not found.');
  }
}

// Function to add event listeners to addMemberButtons
function addMemberButtonListeners() {
  document.querySelectorAll(".addMemberButton").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const projectId = button.getAttribute("data-project-id");
      const projectName =
        button.getAttribute("data-project-name") ||
        button.closest("tr").querySelector("td:first-child").innerText;
      const { value: formValues } = await Swal.fire({
        title: "Menu "+projectName,
        html: `
          <div class="field">
            <label class="label">Gambar Menu</label>
            <div class="control">
                <input class="input" type="file" id="fileInput" name="file" required>
            </div>
          </div>
          <div class="field">
              <div class="control">
                  <button class="button is-primary" id="uploadButton">Upload</button>
              </div>
          </div>
          <div class="field" id="imageField" style="display: none;">
              <div class="control">
                  <img id="uploadedImage" src="" alt="Uploaded Image" style="max-width: 100%;">
              </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label">Nama Menu</label>
              <input type="hidden" id="project-id" name="projectId" value="${projectId}">
              <input type="hidden" id="id" name="id">
              <input type="hidden" id="image" name="image">
              <input class="input" type="text" id="name" name="name" placeholder="Kue Basah Basahan" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Harga</label>
            <div class="control">
              <input class="input" type="number" id="price" name="price" placeholder="7500" required>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: "Tambah Menu",
        didOpen: () => {
          // Memanggil fungsi onInput setelah dialog SweetAlert2 dibuka
          // onInput("phonenumber", validatePhoneNumber);
          onClick('uploadButton',uploadMenuFile);
        },
        preConfirm: () => {
          const id = document.getElementById("id").value;
          const name = document.getElementById("name").value;
          const price = document.getElementById("price").value;
          const image = document.getElementById("image").value;
          const projectId = document.getElementById("project-id").value;
          if (!id || !name || !price || !image) {
            Swal.showValidationMessage(`Mohon upload file dan isi semua inputan`);
          }
          return { id,name,price,image,projectId };
        },
      });

      if (formValues) {
        const { id,name,price,image,projectId } = formValues;
        // Logic to add member
        //onInput("phonenumber", validatePhoneNumber);
        let idprjusr = {
          _id: projectId,
          id: id,
          name:name,
          price:Number(price),
          image:image,
        };
        postJSON(
          backend.project.menu,
          "login",
          getCookie("login"),
          idprjusr,
          postResponseFunction
        );
      }
    });
  });
}


function uploadMenuFile(){
  const targetUrl = backend.upload.menu+document.getElementById("project-id").value; // Ganti dengan URL backend Anda
  const fileInputId = 'fileInput';
  const formDataName = 'menufile'; // Sesuaikan dengan nama form-data di backend
  postFileWithHeader(targetUrl, "login", getCookie('login'), fileInputId, formDataName,runafterUploadFileMenu);
}

function runafterUploadFileMenu(result){
  setValue('id',result.info);
  setValue('image',result.location);
  document.getElementById('fileInput').style.display = 'none';
  document.getElementById('uploadButton').style.display = 'none';
  const imageField = document.getElementById('imageField');
  const uploadedImage = document.getElementById('uploadedImage');
  uploadedImage.src = result.location;
  imageField.style.display = 'block';
  console.log(result);

}

// Add project event listener
document.getElementById("addButton").addEventListener("click", () => {
  Swal.fire({
    title: "Add New Lapak",
    html: `
            <div class="field">
                <label class="label">Lapak User Name</label>
                <div class="control">
                    <input class="input" type="text" id="name" placeholder="huruf kecil tanpa spasi boleh pakai - dan _">
                </div>
            </div>
            <div class="field">
                <label class="label">Judul Lapak</label>
                <div class="control">
                    <input class="input" type="text" id="title" placeholder="minta group id ke bot">
                </div>
            </div>
            <div class="field">
                <label class="label">Deskripsi</label>
                <div class="control">
                    <textarea class="textarea" id="description" placeholder="Tulis deskripsi proyek Kakak"></textarea>
                </div>
            </div>
        `,
    showCancelButton: true,
    confirmButtonText: "Add",
    cancelButtonText: "Cancel",
    preConfirm: () => {
      const name = Swal.getPopup().querySelector("#name").value;
      const title = Swal.getPopup().querySelector("#title").value;
      const description = Swal.getPopup().querySelector("#description").value;

      const namePattern = /^[a-z0-9_-]+$/;
      if (!name || !title || !description ) {
        Swal.showValidationMessage(`Please enter all fields`);
      } else if (!namePattern.test(name)) {
        Swal.showValidationMessage(
          `Lapak User Name hanya boleh mengandung huruf kecil, angka, '-' dan '_'`
        );
      } else {
        return {
          name: name,
          title: title,
          description: description,
        };
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      let resultData = {
        name: getValue("name"),
        title: getValue("title"),
        description: getValue("description"),
      };
      if (getCookie("login") === "") {
        redirect("/login");
      } else {
        postJSON(
          backend.project.data,
          "login",
          getCookie("login"),
          resultData,
          responseFunction
        );
      }
    }
  });
});


function responseFunction(result) {
  if (result.status === 200) {
    const katakata = "Pembuatan proyek baru " + result.data._id;
    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text:
        "Selamat kak proyek " +
        result.data.name +
        " sudah terdaftar dengan ID: " +
        result.data._id +
        " dan Secret: " +
        result.data.secret,
      footer:
        '<a href="https://wa.me/62895601060000?text=' +
        katakata +
        '" target="_blank">Verifikasi Proyek</a>',
      didClose: () => {
        reloadDataTable();
      },
    });
  } else {
    Swal.fire({
      icon: "error",
      title: result.data.status,
      text: result.data.response,
    });
  }
  console.log(result);
}

function postResponseFunction(result) {
  if (result.status === 200) {
    const katakata =
      "Berhasil memasukkan member baru ke project " + result.data.name;
    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text:
        "Selamat kak proyek " +
        result.data.name +
        " dengan ID: " +
        result.data._id +
        " sudah mendapat member baru",
      footer:
        '<a href="https://wa.me/62895601060000?text=' +
        katakata +
        '" target="_blank">Verifikasi Proyek</a>',
      didClose: () => {
        reloadDataTable();
      },
    });
  } else {
    Swal.fire({
      icon: "error",
      title: result.data.status,
      text: result.data.response,
    });
  }
  console.log(result);
}

// Function to add event listeners to removeMemberButtons
function addRemoveMemberButtonListeners() {
  document.querySelectorAll(".removeMemberButton").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const projectName = button.getAttribute("data-project-name");
      const menuid = button.getAttribute("data-menu-id");

      const result = await Swal.fire({
        title: "Hapus menu ini?",
        text: "Kamu tidak dapat mengembalikan aksi ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus menu",
        cancelButtonText: "Kembali",
      });

      if (result.isConfirmed) {
        const memberWillBeDeleted = {
          project_name: projectName,
          menu_id: menuid,
        };

        deleteJSON(
          backend.project.menu,
          "login",
          getCookie("login"),
          memberWillBeDeleted,
          removeMemberResponse
        );
      }
    });
  });
}

function removeMemberResponse(result) {
  if (result.status === 200) {
    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Member has been removed.",
      didClose: () => {
        reloadDataTable();
      },
    });
  } else {
    Swal.fire({
      icon: "error",
      title: result.data.status,
      text: result.data.response,
    });
  }
  console.log(result);
}

// Remove project mechanism
function addRemoveProjectButtonListeners() {
  document.querySelectorAll(".removeProjectButton").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const projectName = button.getAttribute("data-project-name");

      const result = await Swal.fire({
        title: "Hapus project ini?",
        text: "Kamu tidak dapat mengembalikan aksi ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus project",
        cancelButtonText: "Kembali",
      });

      if (result.isConfirmed) {
        const projectWillBeDeleted = {
          project_name: projectName,
        };

        deleteJSON(
          backend.project.data,
          "login",
          getCookie("login"),
          projectWillBeDeleted,
          removeProjectResponse
        );
      }
    });
  });
}

function removeProjectResponse(result) {
  if (result.status === 200) {
    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Project has been removed.",
      didClose: () => {
        reloadDataTable();
      },
    });
  } else {
    Swal.fire({
      icon: "error",
      title: result.data.status,
      text: result.data.response,
    });
  }
  console.log(result);
}

function addEditProjectButtonListeners() {
  document.querySelectorAll(".editProjectButton").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const projectId = button.getAttribute("data-project-id");
      const projectName = button.getAttribute("data-project-name");
      const projectTitle = button.getAttribute("data-project-title");
      const projectDescription = button.getAttribute(
        "data-project-description"
      );

      const { value: formValues } = await Swal.fire({
        title: "Edit Lapak",
        html: `
          <div class="field">
            <label class="label">Project Name</label>
            <div class="control">
              <input class="input" type="text" id="name" value="${projectName}" disabled>
            </div>
          </div>
          <div class="field">
            <label class="label">WhatsApp Group ID</label>
            <div class="control">
              <input class="input" type="text" id="title" value="${projectTitle}">
            </div>
          </div>
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <textarea class="textarea" id="description">${projectDescription}</textarea>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: "Update",
        cancelButtonText: "Cancel",
        preConfirm: () => {
          const title = Swal.getPopup().querySelector("#title").value;
          const description =
            Swal.getPopup().querySelector("#description").value;
          if (!title || !description) {
            Swal.showValidationMessage(`Please enter all fields`);
          }
          return { title, description };
        },
      });

      if (formValues) {
        const { title, description } = formValues;
        const updatedProject = {
          _id: projectId,
          title: title,
          description: description,
        };
        putJSON(
          backend.project.data, // Assumes a POST method will handle updates as well
          "login",
          getCookie("login"),
          updatedProject,
          updateResponseFunction
        );
      }
    });
  });
}

function updateResponseFunction(result) {
  if (result.status === 200) {
    Swal.fire({
      icon: "success",
      title: "Project Updated",
      text: `Project ${result.data.name} has been updated successfully.`,
      didClose: () => {
        reloadDataTable();
      },
    });
  } else {
    Swal.fire({
      icon: "error",
      title: result.data.status,
      text: result.data.response,
    });
  }
  console.log(result);
}
