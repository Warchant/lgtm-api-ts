import {Configuration, SystemApi} from "../index";

describe('system', ()=>{
  const conf = new Configuration({
    accessToken: process.env.LGTM_ACCESS_TOKEN || ''
  });

  const api = new SystemApi(conf);

  it('get health', async ()=>{
    const {data} = await api.getHealth();
    expect(data).toEqual({status: "UP"})
  })
});
