export default class MyBackend {

  public async signIn(login: string, password: string) {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "id": "",
      "login": login,
      "password": password,
      "sessionId": "",
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const res = await fetch("https://canal-service-test-backend.zeinell69.workers.dev/v1/login", requestOptions)
    const data = await res.json()
    if (!data.ok) throw new Error(data.message)

  }

}