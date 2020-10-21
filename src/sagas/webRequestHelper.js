import moment from "moment";

const errorMessageBuilder = (error) => {
  let timestamp = `${moment().format("YYYY-MM-DD HH:mm:ss")}`;

  if (error && error.request) {
    const { status, statusText, responseText } = error.request;

    if (status === 0) {
      return (
        timestamp + "Network Not Available. App cannot connect to the Server"
      );
    }

    return `${timestamp} ${statusText} (${status} - ${responseText})`;
  }

  return `${timestamp} Unexpected Error: ${error}`;
};

export default errorMessageBuilder;
