//2023.01.23. joyujeong960@gmail.com

function dialogflow(){
    $('#button-type').css('display', 'none');
    $('#dialogflow').css('display', 'block');
}
function buttontype() {
    $('#dialogflow').css('display', 'none');
    $('#button-type').css('display', 'flex');
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
function scroll() {
    let offset = $('#box-content').prop('scrollHeight');
    $('#box-content').animate({scrollTop: offset}, 500);
}
function show_chat() {
    let svg_html_x = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#8b0427" 
                          class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
                       </svg>`
    $('#chat-click').empty();
    $('#chat-click').append(svg_html_x);
    $('#chat-click').attr('onclick', 'hide_chat()');
    $('#chatbox').css('display', 'flex');
}
function hide_chat() {
    let svg_html_check= `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#8b0427" 
                            class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                         </svg>`
    $('#chat-click').empty();
    $('#chat-click').append(svg_html_check);
    $('#chat-click').attr('onclick', 'show_chat()');
    $('#chatbox').css('display', 'none');
}


//
//CHATBOT
//
let start_answer_script = `<div class="content-line"><div class="answer-script">시작</div></div>`
let yes_answer_script = `<div class="content-line"><div class="answer-script">예</div></div>`
let no_answer_script = `<div class="content-line"><div class="answer-script">아니오</div></div>`

//
//RESTART (INTRO)
//
function restart() {
    $('#box-content').empty();
    intro_append();
    intro_to_script1(0);
}
function intro_append(){
    let intro = `<div class="content-script" id="script_intro">
                    이 챗봇은 <br><span style="font-weight:600">[피고의 경정 판단을 위한 순서도]</span>에 의거하여 만들어졌습니다.<br><br>
                    챗봇 시작을 바라시면<br><span style="font-weight:600">아래의 <span style="color:#8b0427">시작</span> 버튼</span>을 눌러주세요.
                 </div>`;
    $('#box-content').append(intro);
}

//
//INTRO -> SCRIPT1
//
function intro_to_script1(sleep_for_start=1) {
    script1_append(sleep_for_start);
    script1_buttonchange();
}
async function script1_append(sleep_for_start) {
    let script1 = `<div class="content-script" id="script1">
                        <span style="font-weight:600; line-height:20px;">질문 1.</span><br>
                        원고가 단순히 피고의 표시를 잘못 표시하였나요?<br>
                        (단순히 피고를 잘못 표시했다는 것은 ‘신사임당’을 ‘신상임당’이라고 표기한 경우를 예로 들 수 있습니다.)
                    </div>`;
    if (sleep_for_start==1){
        await sleep(50);
    }
    $('#box-content').append(start_answer_script);
    await sleep(300);
    $('#box-content').append(script1);

    scroll();
}
function script1_buttonchange() {
    $('#box-answer').empty();
    $('#box-answer').append(`<div class="button-answer" onclick="script1_to_result1()" id="yes">예</div>`);
    $('#box-answer').append(`<div class="button-answer" onclick="script1_to_script2()" id="no">아니오</div>`);
}

//
//SCRIPT1 -> RESULT1
//
function script1_to_result1() {
    result1_append();
    result_buttonchange();
}
async function result1_append() {
    let result1 = `<div class="content-script" id="result1">
                        <span style="font-weight:600;">피고의 경정이 아닙니다.</span><br>
                        이 경우 잘못된 부분을 정정하여 '당사자표시정정 신청서'를 제출해 주세요.
                    </div>`;

    await sleep(50);
    $('#box-content').append(yes_answer_script);
    await sleep(300);
    $('#box-content').append(result1);

    scroll();
}
//
//SCRIPT1 -> SCRIPT2
//
function script1_to_script2() {
    script2_append();
    script2_buttonchange();
}
async function script2_append() {
    let script2 = `<div class="content-script" id="script2">
                        <span style="font-weight:600; line-height:20px;">질문 2.</span><br>
                        원고가 피고지정에 법률적 평가를 그르칠 정도로 명백하게 착오를 일으켰나요?<br>
                        (명백한 착오라는 것은 회사를 피고로 해야 하는데 대표이사 개인을 피고로 한 경우, 학교 법인을 피고로 해야 하는데 학교를 피고로 한 경우 등을 예로 들 수 있습니다.)
                    </div>`;

    await sleep(50);
    $('#box-content').append(no_answer_script);
    await sleep(300);
    $('#box-content').append(script2);

    scroll();
}
function script2_buttonchange() {
    $('#box-answer').empty();
    $('#box-answer').append(`<div class="button-answer" id="yes" onclick="script2_to_script3()">예</div>`);
    $('#box-answer').append(`<div class="button-answer" id="no" onclick="script2_to_result2()">아니오</div>`);
}

//
//SCRIPT2 -> RESULT2
//
function script2_to_result2() {
    result_no_append(no_answer_script);
    result_buttonchange();
}
function result2_buttonchange(){
    $('#box-answer').empty();
    $('#box-answer').append(`<div class="button-answer" id="restart" onclick="restart()">다시 시작</div>`);
}
//
//SCRIPT2 -> SCRIPT3
//
function script2_to_script3() {
    script3_append();
    script3_buttonchange();
}
async function script3_append() {
    let script3 = `<div class="content-script" id="script3">
                        <span style="font-weight:600; line-height:20px;">질문 3.</span><br>
                        청구 시점이 1심의 변론의 종결 전인가요?
                   </div>`;

    await sleep(50);
    $('#box-content').append(yes_answer_script);
    await sleep(300);
    $('#box-content').append(script3);

    scroll();
}
function script3_buttonchange() {
    $('#box-answer').empty();
    $('#box-answer').append(`<div class="button-answer" id="yes" onclick="script3_to_script4()">예</div>`);
    $('#box-answer').append(`<div class="button-answer" id="no" onclick="script3_to_result3()">아니오</div>`);
}

//
//SCRIPT3 -> RESULT3
//
function script3_to_result3() {
    result_no_append(no_answer_script);
    result_buttonchange();
}
//
//SCRIPT3 -> SCRIPT4
//
function script3_to_script4() {
    script4_append();
    script4_buttonchange();
}
async function script4_append() {
    let script4 = `<div class="content-script" id="script4">
                        <span style="font-weight:600; line-height:20px;">질문 4.</span><br>
                        피고 교체 전후의 소송물이 동일한가요?
                    </div>`;

    await sleep(50);
    $('#box-content').append(yes_answer_script);
    await sleep(300);
    $('#box-content').append(script4);

    scroll();
}
function script4_buttonchange() {
    $('#box-answer').empty();
    $('#box-answer').append(`<div class="button-answer" id="yes" onclick="script4_to_result4_YES()">예</div>`);
    $('#box-answer').append(`<div class="button-answer" id="no" onclick="script4_to_result4_NO()">아니오</div>`);
}

//
//SCRIPT4 -> RESULT4_NO & RESULT$_YES
//
function script4_to_result4_NO() {
    result_no_append(no_answer_script);
    result_buttonchange();
}
function script4_to_result4_YES() {
    result_yes_append(yes_answer_script);
    result_buttonchange();
}

//
// RESULT_YES & RESULT_NO
//
async function result_yes_append(answer_script){
    let result_yes = `<div class="content-script">
                        <span style="font-weight:600;">'피고의 경정'에 해당합니다.</span><br>
                        '피고경정신청서'를 제출해 주세요.
                    </div>`;
    await sleep(50);
    $('#box-content').append(answer_script);
    await sleep(500);
    $('#box-content').append(result_yes);

    scroll();
}
async function result_no_append(answer_script){
    let result_no = `<div class="content-script">
                        <span style="font-weight:600;">피고의 경정이 아닙니다.</span>
                    </div>`;
    await sleep(50);
    $('#box-content').append(answer_script);
    await sleep(500);
    $('#box-content').append(result_no);

    scroll();
}

//
// RESULT_BUTTONCHANGE(RESTART)
//
function result_buttonchange(){
    $('#box-answer').empty();
    $('#box-answer').append(`<div class="button-answer" id="restart" onclick="restart()">다시 시작</div>`);
}