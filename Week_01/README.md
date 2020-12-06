学习笔记

1、三元表达式运用；
2、let 加 {} 变成局部变量；
3、写代码 写算法时，先想好策略，更有利于代码逻辑的编写；
4、break 跳出 两层循环 ，加一个 label；
        outer:for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (pattern[i *3  + j]) {
                    continue;
                }
                let t = clone(pattern);
                t[i *3  + j] = color;
                let r = bestChoice(t,3-color).result;

                if (-r > result) {
                    result = -r;
                    point = [i,j]
                }
                if (result === 1) {
                    break outer;
                }
            }
        }
5、二维数组变成一位数组 根据 JavaScript 原型机制，执行Object.create(pattern)，只是创建了一个新对象，以原有的 pattern 为原型，不但继承了原来pattern的方法，也继承了原来pattern的数据，新 clone 的 pattern 的生命周期短于老的 pattern ，节省很多内存空间；
6、前端知识体系是一个需要自己不断去完善的过程，自己的前端基础知识还算挺差的，需要自己花费精力去不断学习和完善；
7、作业和算法题啥的，要尽早做，不能拖，执行力很重要。

#学号: G20200447070048
#姓名: 周志超
#班期: 第七期
#小组: 4组
#作业&总结链接: https://github.com/zhouzhichao/Frontend-04-Template/tree/master/Week_01