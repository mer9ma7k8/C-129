Peter_pan_song="";
Harry_potter_theme_song="";
leftWrist_x=0;
leftWrist_y=0;
rightWrist_x=0;
rightWrist_y=0;
scoreleftWrist=0;
song_Peter_pan="";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on("pose",gotPoses);
}

function preload(){
    Peter_pan_song = loadSound("music2.mp3");
    Harry_potter_theme_song = loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#37ff00");
    stroke("#ff0000");

    song_Peter_pan=Peter_pan_song.isPlaying();
    console.log(song_Peter_pan);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x, leftWrist_y,20);
        Harry_potter_theme_song.stop();
        if(song_Peter_pan == false){
            Peter_pan_song.play();
        }
        else{
            document.getElementById("song_id").innerHTML="Song Name : Peter Pan Song";
        }
    }

}

function modelLoaded(){
    console.log("PoseNet Is Initiliazed");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)

        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        leftWrist_x=results[0].pose.leftWrist.x;
        leftWrist_y=results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y)

        rightWrist_x=results[0].pose.rightWrist.x;
        rightWrist_y=results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y)


    }
}