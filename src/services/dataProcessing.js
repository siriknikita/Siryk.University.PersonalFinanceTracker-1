export async function fetchData(url, key) {
  const response = await fetch(
    `https://personal-finance-tracker-server.azurewebsites.net/api/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache",
      },
      mode: "cors",
    }
  );
  const data = await response.json();
  return data[key];
}

export async function sendPostData(url, data, key) {
  console.log("URL:", url);
  console.log("Data:", data);
  console.log("Key:", key);
  
  const response = await fetch(
    `https://personal-finance-tracker-server.azurewebsites.net/api/${url}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache",
      },
      mode: "cors",
    }
  );

  console.log("Response:", response);

  const returnedData = await response.json();
  return returnedData[key];
}
