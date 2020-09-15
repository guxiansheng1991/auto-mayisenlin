
auto();// 自动打开无障碍服务
//console.show();
log('运行了' + device.width + ',' + device.height);

setScreenMetrics(device.width, device.height);

// 逛一逛的位置,数据需自己适配
var otherX = 970;
var otherY = 1550;
var count = 600;
// 自己手机 能量球位置 ，最多六个 需自己适配 x 坐标 /Y 坐标 依次排列
var energyPoint = [220, 740, 320, 720, 480, 650, 620, 620, 730, 660, 920, 790];

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
    text("成就").waitFor()
    sleep(1000)
    if (null != textContains("收集能量").findOne(3000)) {
        // var Energys = textContains("收集能量").find() //查找所有的可以搜集的能量
        // for (var i = 0; i < Energys.length; i++) {
        //     var energyBound = Energys[i].bounds()
        //     log(energyBound.centerX() + ',' + energyBound.centerY());
        //     click(energyBound.centerX(), energyBound.centerY());
        // }
        collectOtherEnergyFromPoint();
    }
}

//通过能量球的位置来点选
function collectOtherEnergyFromPoint() {
    for (var i = 0; i < energyPoint.length; i += 2) {
        var numx = Number(energyPoint[i]);
        var numy = Number(energyPoint[i + 1]);
        click(numx, numy);
        click(numx, numy - 50);
        click(numx, numy + 50);
        log(numx + ',' + numy);
        log(numx + ',' + (numy - 50));
        log(numx + ',' + (numy + 50));
        log('------');
    }
}

// 收取好友的能量
function collectOtherFriendEnergy() {
    // 点击逛一逛目标位置
    click(otherX, otherY);
    sleep(2000);
    // 防止找不到"成就"勋章,造成无法收取
    var chengjiu = className("android.widget.Button").text("成就").findOne(2000);
    if (chengjiu == null) {
        log('不存在成就,页面后退');
        back();
    } else {
    }
    collectEnergy();
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
    if (count <= 0) {
        clearInterval(myInterval);
        endCollectEnergy()
    }
}, 3000);