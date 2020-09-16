
auto();// 自动打开无障碍服务
log('运行了'+device.width+','+device.height);

setScreenMetrics(device.width, device.height);

// 以下数据需自己适配
var energyPoint = [220, 740, 320, 720, 480, 650, 620, 620, 730, 660, 920, 790] //自己手机 能量球位置 ，最多六个 需自己适配 x 坐标 /Y 坐标 依次排列

//打开森林页面
function openForestPage() {
    log('打开app');
    var count = 10;
    var isOpen = false;
    while(count >= 0 && !isOpen) {
        log('正在打开支付宝');
        toast('正在打开支付宝');
        var name2 = getPackageName("支付宝");
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
function collectOwnEnergy() {
    text("公益林").waitFor()
    sleep(1000)
    if (null != textContains("收集能量").findOne(3000)) {
        var Energys = textContains("收集能量").find() //查找所有的可以搜集的能量
        for (var i = 0; i < Energys.length; i++) {
            var energyBound = Energys[i].bounds()
            click(energyBound.centerX(), energyBound.centerY());
        }
    }
}

//通过能量球的位置来点选
function collectOtherEnergyFromPoint() {
    for (var i = 0; i < energyPoint.length; i += 2) {
        click(energyPoint[i], energyPoint[i + 1])
        click(energyPoint[i], energyPoint[i + 1] - 30)
        click(energyPoint[i], energyPoint[i + 1] + 30)
    }
}

//拾取他人或者自己能量
function collectOtherEnergy() {
    collectOtherEnergyFromPoint()
}

//点击查看更多好友
function swipToMoreFriends() {
    while (!text("查看更多好友").exists()) {
        swipe(device.width / 2, device.height * (2 / 3), device.width / 2, device.height / 3, 1000);
    }
    text("查看更多好友").findOne().click()
    sleep(2000)
    while (!text("没有更多了").exists()) {
        swipe(device.width / 2, device.height * (5 / 6), device.width / 2, device.height / 6, 1000);
    }

}

//获取好友的名字
function getFriendName(friend) {
    return friend.child(2).child(0).child(0).text()
}

//判断点击的是不是自己
function judgeIfSelf(friend) {
    var name = getFriendName(friend)
    if (name == "静水鱼游") {
        return true
    } else {
        return false
    }

}

//拾取好友能量
function selectFriendsEnergy() {
    var friendsList = className("android.webkit.WebView").findOne().child(0).child(0).child(1) //获取好友列表
    for (var i = 0; i < friendsList.childCount(); i++) {
        if (!judgeIfSelf(friendsList.child(i))) {
            // 当可以收取的时候再收取
            var c = friendsList.child(i);
            friendsList.child(i).click()
            sleep(2000)
            collectOtherEnergy()
            back()
            sleep(1000)
        }
    }
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
collectOwnEnergy()
swipToMoreFriends()
selectFriendsEnergy()
endCollectEnergy()