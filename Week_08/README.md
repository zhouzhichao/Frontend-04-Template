学习笔记

# 浏览器工作原理
## 1. 浏览器总论 | 浏览器工作原理总论
bitmap 转给显卡驱动设备，才能转换成人眼可识别的光信号，所以浏览器所有的目标，就是从一个URL最后得到一张bitmap，这根过程是一个浏览器的基础的渲染过程。  
![aa 浏览器架构图](https://m.qpic.cn/psc?/V5228HEj1SOwm62sLkbN0uV8hW0hMF6B/bqQfVz5yrrGYSXMvKr.cqcHyfxQ*Wyu9D.1H0egeUqXV7xe1arZjzFStjR7ZCInwnnxh3BN2b34x40XCaZgvwkWRvsqQNKQwaFXdj9phTJA!/b&bo=xAg4BAAAAAADB9I!&rf=viewer_4)  

## 2. 状态机 | 有限状态机

> 有限状态机  
>> 1.每一个状态都是一个机器  
>>
>>+ 在每一个机器里，我们可以做计算、存储、输出……  
>>+ 所有的这些机器接受的输入是一致的  
>>+ 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数（无副作用）  
>>
>> 2.每一个机器知道下一个状态  
>>
>>+ 每一个机器都有确定的下一个状态（Moore）  
>>+ 每个机器根据输入决定下一个状态（Mealy）  

## 3. 状态机 | 不使用状态机处理字符串（一）

+ 在代码中  

## 8.HTTP请求 | HTTP的协议解析

> 1.http 协议的解析  
>> （1）ISO-OSI 七层网络模型  
>>>+ 应用层、表示层、会话层、传输层、网络层、数据链路、物理层  
可以将这7层 分为HTTP（应用层、表示层、会话层）、TCP（传输层）、internet（网络层）、4G/5G/Wifi（数据链路、物理层）四个部分

## 10. HTTP请求 | 实现一个HTTP的请求  

> （1）第一步 http 请求总结  
>
> + 设计一个 http 请求的类
> + content type 是一个必要的字段，要有默认值
> + body 是一个kv的格式  
> + 不同的content-type 影响 body 的格式  
>
> （2） send 函数总结  
>
> + 在Request 构造器中收集必要信息  
> + 设计一个send 函数，把请求真实发送到服务器
> + send 函数是异步的，所以返回Promise  
>
> （3）发送请求  
>
> + 设计支持已有的 connection 或者自己新增 connection  
> + 收到数据传给 parser  
> + 根据 parser 的状态 resolve Promise  
>
> （4）ResponseParse 总结  
>
> + Response 必须分段构造，所以我们要用一个 Response Parser 来 “装配”  
> + ResponseParser 分段处理 Response Text，我们用状态机来分析文本结构  
>
> （5）BodyParse 总结
>
> + Response 的 body 可能根据 Content-Type 有不同的结构，因此我们会采用子 Parser 的结构来解决问题  
> + 以 ChunkedBodyParser 为例，我们同样用状态机来处理 body 的格式
