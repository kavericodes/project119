function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}

function setup(){
    canvas = createCanvas(300,300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.SpeechSynthesis;
}

function clearCanvas(){
    background("white");
}

function draw(){
    strokeWeight(15);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    check_sketch();
    if(drawn_sketch == sketch){
        answer_holder = "set";
        score = score++;
        document.getElementById("score").innerHTML = "Score" + score;
    }
}

function updateCanvas(){
    random_number = Math.floor((Math.random()*quick_draw_data_set.length)+1);
    console.log(random_number);
    sketch = quick_draw_data_set[random_number];
    console.log(sketch);
    document.getElementById("tobedrawn").innerHTML = "Sketch to be drawn:" + sketch;
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results);
        document.getElementById("label").innerHTML = "Your Sketch:"+result[0].label;
        document.getElementById("confidence").innerHTML = "Confidence:"+Math.round(result[0].confidence*100)+"%";
        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}

function check_sketch(){
    timer_counter = timer_counter++;
    document.getElementById("timer").innerHTML = "Timer:" + timer_counter;
    console.log(timer_counter);
    if(timer_counter>500){
        timer_counter = 0;
        timer_check = "completed"
        answer_holder = "set";
    }
    if(timer_check == "completed" || answer_holder=="set" ){
        answer_holder = "";
        timer_check = "";
        updateCanvas();
    }
}

