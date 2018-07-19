// 使用es5语法
(function() {
    $(document).ready(function() {
        initEvent();
        initLayout();
    });

    /**
     * 初始化事件
     */
    function initEvent() {
        // 导航栏绑定点击事件
        $('.header .nav-link').on('click', function() {
            // 设置hash值
            location.hash = $(this).attr('href');
            // 设置导航栏active样式
            $('.header .nav-link').removeClass('active');
            $(this).addClass('active');
            // 显示页面
            $('.content [class^="page-"]').addClass('dn');
            $('.content .page-' + location.hash.slice(1)).removeClass('dn');
        });
    }

    /**
     * 初始化页面
     */
    function initLayout() {
        location.hash = location.hash || '#1';
        // 导航栏激活当前导航
        $('.header .nav-link').removeClass('active');
        $('.header .nav-link[href="' + location.hash + '"]').addClass('active');
        // 显示当前页面
        $('.content .page-' + location.hash.slice(1)).removeClass('dn');
    }
})();
