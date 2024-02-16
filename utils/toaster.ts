import { toast } from "react-hot-toast";

export const toaster = {
  success: (message: string, duration?: number) => {
    toast.success(message, {
      position: "bottom-center",
      duration,
      style: {
        color: "#010F07",
        opacity: "50%",
        textAlign: "center",
        backgroundColor: "#fff",
      },
    });
  },
  error: (message: string, duration?: number) => {
    toast.error(message, {
      position: "bottom-center",
        duration,
        style: {
            marginBottom: "70px",
        },
    });
  },
  loading: (message: string,) => {
    toast.loading(message, {
      position: "bottom-center",
      style: {
      },
    });
  },
  custom: (jsx: JSX.Element, duration?: number) => {
    toast.custom(jsx,
      {
        duration: duration || 1000,
        position: "bottom-center",
        style: {
          paddingBottom: "60px"
        }
      }
    );
  },
}
