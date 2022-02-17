import toast from "react-hot-toast";

export const errorNotification = (message) => toast.error(message);
export const successNotification = (message) => toast.success(message);
