/**
 * 1. 唤醒手机
 * 2. 保持屏幕常亮
 */

auto();// 自动打开无障碍服务
log('运行了'+device.width+','+device.height);

//解锁手机
function unlock() {
    while (!device.isScreenOn()) {
        device.wakeUp();
    }
    sleep(1000);
    swipe(500,2000,500,1000,201);//可以
    desc(2).findOne().click();
    desc(5).findOne().click();
    desc(3).findOne().click();
    desc(6).findOne().click();
    desc(1).findOne().click();
    desc(3).findOne().click();
    sleep(2000);
}

// 1. 解锁手机
unlock();

sleep(2000);

// 2. 保持屏幕常亮
device.keepScreenOn(3600 * 1000);
