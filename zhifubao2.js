
auto();// 自动打开无障碍服务
//console.show();
log('运行了' + device.width + ',' + device.height);

setScreenMetrics(device.width, device.height);

// 逛一逛的位置,数据需自己适配
var otherX = 970;
var otherY = 1550;
var count = 600;
// 自己手机 能量球位置 ，最多六个 需自己适配 x 坐标 /Y 坐标 依次排列
var energyPoint = [220, 740, 370, 650, 550, 630, 700, 640, 850, 750, 950, 820];

//打开森林页面
function openForestPage() {
    log('打开app');
    var count = 10;
    var isOpen = false;
    while (count >= 0 && !isOpen) {
        log('正在打开支付宝');
        toast('正在打开支付宝');
        var name2 = getPackageName("支付宝");
        isOpen = launchPackage(name2);
        isOpen = launchApp('支付宝');
        count--;
        sleep(1000);
    }
    sleep(1000)
    text("首页").waitFor()
    sleep(500)
    click("首页") //点击首页
    text("蚂蚁森林").waitFor()
    sleep(500)
    click("蚂蚁森林") //点击首页 //点击蚂蚁森林
    log('进入蚂蚁深林首页了')
}

//拾取自己能量
function collectEnergy() {
    text("种树").waitFor()
    // sleep(1000)
    // if (null != textContains("可领取").findOne(3000)) {
    //     collectOtherEnergyFromPoint();
    // }
    collectOtherEnergyFromPoint();
}

//通过能量球的位置来点选
function collectOtherEnergyFromPoint() {
    for (var i = 0; i < energyPoint.length; i += 2) {
        var numx = Number(energyPoint[i]);
        var numy = Number(energyPoint[i + 1]);
        click(numx, numy);
        click(numx - 50, numy);
        click(numx + 50, numy);
        click(numx, numy - 50);
        click(numx, numy + 50);
    }
}

// 收取好友的能量
function collectOtherFriendEnergy() {
    // 点击逛一逛目标位置
    click(otherX, otherY);
    sleep(1000);
    // 防止找不到"最新动态"文字,造成无法收取
    var chengjiu = className("android.view.View").text("最新动态").findOne(2000);
    if (chengjiu == null) {
        log('不存在成就,页面后退');
        back();
        return;
    }
    // if (null != textContains("可领取").findOne(3000)) {
    //     collectOtherEnergyFromPoint();
    // }
    collectOtherEnergyFromPoint();
}

//退出程序
function endCollectEnergy() {
    back(); sleep(1000);
    back(); sleep(1000);
    back(); sleep(1000);
    //home()
    log('本次执行结束-------------------------------------');
}

openForestPage()
collectEnergy()
var myInterval = setInterval(function () {
    collectOtherFriendEnergy();
    count--;
    log('剩余执行次数为:' + count);
    if (count % 10 == 0) {
        log('开始收取自己的能量,count:'+count);
        // 如果存在'种树',即代表已经在我的蚂蚁森林页面了,无需后退.
        var gongyilin = className("android.widget.Button").text("种树").findOne(2000);
        if (gongyilin != null) {
            collectEnergy();
        } else {
            back();
            collectEnergy();
        }
    }
    if (count <= 0) {
        clearInterval(myInterval);
        endCollectEnergy();
    }
}, 2000);