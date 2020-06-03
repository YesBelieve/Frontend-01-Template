# 每周总结可以写在这里

#### 排版
- float脱离文档流，会占着原来的位置
- position
    - absolute/fixed脱离文档流，不会占着原来位置
    - relative未脱离文档流

#### vertical-align
- vertical-align 最好只取Top Bottom Middle
    - Vertical-align: baseline，是拿自己的 baseline 去对其行的 baseline
    - Vertical-align: top，middle，bottom，是拿自己的 "顶部" "中线" "底部" 去对其行的 "顶部" "中线" "底部"
    - vertical-align: text-top，text-bottom，是拿自己的 "顶部" "底部" 去对齐行的 text-top 和 text-bottom 线

#### CSS优先级
- 优先级计算规则
优先级就是分配给指定的 CSS 声明的一个权重，它由 匹配的选择器中的 每一种选择器类型的 数值 决定。而当优先级与多个 CSS 声明中任意一个声明的优先级相等的时候，CSS 中最后的那个声明将会被应用到元素上。当同一个元素有多个声明的时候，优先级才会有意义。因为每一个直接作用于元素的 CSS 规则总是会接管/覆盖（take over）该元素从祖先元素继承而来的规则。
- 优先级四元组
    - [内联选择器个数, id选择器个数, class选择器个数/属性选择器个数/伪类选择器个数, 标签选择器个数]
    - 权重依次降低
    - :not不参与优先级计算，但是:not(选择器)中的选择器会被当做普通选择器进行计数

- 课堂练习
```
//选择器的优先级 练习
div#a.b .c[id=x]    [0,1,3,1]
#a:not(#b) [0,2,0,0]   :not这个伪类是不参与优先级计算的
*.a  [0,0,1,0] *也是不参与优先级计算的
div.a  [0]
```
#### 伪类
- 链接/行为
    - :any-link // a标签不加href就不是超链接
    - :hover 只会被鼠标触发
    - :active
    - :focus
    - :target a标签当锚点
- 树结构
    - empty
    - nth-child
    - nth-last-child
    - first-child last-child only-child

- 逻辑性
    - not伪类
    - :where :has
- 伪元素
    - :before
    - :after
    - :first-line 选中排版的第一行
    - fist-letter

#### Tips:
- 大家请记住下面这个表现原则：如果一个元素具有 BFC，内部子元素再怎么翻江倒海、翻云覆雨，都不会影响外部的元素。所以，BFC 元素是不可能发生 margin 重叠的，因为 margin 重叠是会影响外部的元素的；BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部元素的设定。

- block-level 表示可以被放入 bfc
- block-container 表示可以容纳 bfc
- block-box = block-level + block-container
- block-box 如果 overflow 是 visible， 那么就跟父 bfc 合并