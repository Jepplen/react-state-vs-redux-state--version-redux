const lStorage = localStorage.getItem("APP_STATE");
const parsedStorage = JSON.parse(lStorage!);

export default parsedStorage;
