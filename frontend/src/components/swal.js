import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const swal = (message, type) => {
  MySwal.fire({
    text: message,
    icon: type,
    timer: 1000,
    showConfirmButton: false,
    position: "top-end",
  });
};

export { swal, MySwal };
