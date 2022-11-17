import React from 'react'
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
const socket = io('https://saferoadfmssocketio-hcr64pytia-uc.a.run.app/', {
  auth: {
    token: '111',
    userid: 'sub',
  },
});

socket.emit(
  'subscribe',
  '{"leave":false,"keys":["357073294370800","354017116571635","357073296714450","357073291371157","357073294370800","359632105588815","357073293616153","359632104389702","357073291371157","357073293022196","357073293022197","866344050894364","357073293022196","357073292819808","354017116571635","358480089679031","357073291376974","357073294578170","860640057266795","350544501052008","350424066933811","354018119298713","352625691387144","357073293756462","358480089178448"]}'
);
function Home() {
    const [data, setData] = useState([]);

  // socket.on('chat message', function(msg) {
  // var item = document.createElement('li');
  // item.textContent = msg;
  // messages.appendChild(item);
  // window.scrollTo(0, document.body.scrollHeight);
  // });

  useEffect(() => {
    console.log('ddd');
    socket.on('onChange', (ddd) => {
      console.log(ddd);
      setData(ddd);
    });

    socket.on('joined', (ddd) => {
      console.log(ddd);
    });
  }, []);
  return (
    <div>
      {
        <div
          key={data.SerialNumber}
          style={{
            textAlign: 'center',
          }}
        >
          <h1>{data.SerialNumber}</h1>
          <h2>{data.RecordDateTime}</h2>
          <h3>{data.Longitude}</h3>
          <h3>{data.Address}</h3>
          <h4>{data.Latitude}</h4>
          <h5>{data.EngineStatus}</h5>
          <h6>{data.Speed}</h6>
          <h6>{data.Direction}</h6>
        </div>
      }
    </div>
  )
}

export default Home