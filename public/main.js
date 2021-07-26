const form = document.getElementById('vote-form');

form.addEventListener('submit', e=>{
    
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {os: choice};

    fetch('http://localhost:3000/poll',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .then(data=> console.log(data))
    .catch(err => console.log(err));

    e.preventDefault();
});
fetch('http://localhost:3000/poll')
.then(res=>res.json())
.then(data=>{
   const votes = data.votes;
   const totalVotes = votes.length
   //count vote points
   const  voteCounts = votes.reduce((acc,vote)=>((acc[vote.os]=(acc[vote.os]||0)+ parseInt(vote.points)),acc),{});

   let dataPoints = [
    { label: 'Italy', y:voteCounts.Italy },
    { label: 'France', y:voteCounts.France },
    { label: 'Switzerland', y:voteCounts.Switzerland },
    { label: 'Iceland', y:voteCounts.Iceland },
    { label: 'Ukraine', y:voteCounts.Ukraine },
    { label: 'Finland', y:voteCounts.Finland },
    { label: 'Lithuania', y:voteCounts.Lithuania },
    { label: 'Malta', y:voteCounts.Malta },
    { label: 'Russia', y:voteCounts.Russia },
    { label: 'Moldova', y:voteCounts.Moldova },
    { label: 'Greece', y:voteCounts.Greece },
    { label: 'Bulgaria', y:voteCounts.Bulgaria },
    { label: 'Sweden', y:voteCounts.Sweden },
    { label: 'Serbia', y:voteCounts.Serbia },
    { label: 'Cyprus', y:voteCounts.Cyprus },
    { label: 'Israel', y:voteCounts.Israel },
    { label: 'Norway', y:voteCounts.Norway },
    { label: 'Belgium', y:voteCounts.Belgium },
    { label: 'Azerbaijan', y:voteCounts.Azerbaijan },
    { label: 'Albania', y:voteCounts.Albania },
    { label: 'San Marino', y:voteCounts.Sanmarino },
    { label: 'Netherlands', y:voteCounts.Netherlands },
    { label: 'Spain', y:voteCounts.Spain },
    { label: 'Germany', y:voteCounts.Germany },
    { label: 'United Kingdom', y:voteCounts.Unitedkingdom }

];
const chartContainer = document.querySelector('#chartContainer');
if(chartContainer){
    const chart = new CanvasJS.Chart('chartContainer',{
        animationEnabled: true,
        theme:'theme1',
        title:{
            text: `Total Votes ${totalVotes}`
        },
        data: [
            {
                type:'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();
    Pusher.logToConsole = true;

    var pusher = new Pusher('93424883ff8e56f9d55a', {
      cluster: 'eu'
     
    });

    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function(data) {
      dataPoints = dataPoints.map(x=>{
          if(x.label == data.os){
              x.y+=data.points;
              return x
          }else{
              return x
          }
      });
      chart.render();
    });
}

})


