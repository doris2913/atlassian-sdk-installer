<%--
All changes in this jsp must be mirrored in general.jsp
--%>
<%@ page import="com.atlassian.jira.web.util.ProductVersionDataBeanProvider" %>
<%@ taglib prefix="ww" uri="webwork" %>
<%@ taglib uri="jiratags" prefix="jira" %>
<body id="jira" class="aui-layout aui-theme-default <jira:a11y-classes/> <%= JspDecoratorUtils.getBody().getBodyTagProperty("class") %>" <%= ComponentAccessor.getComponent(ProductVersionDataBeanProvider.class).get().getBodyHtmlAttributes() %>>
<div id="page">
    <header id="header" role="banner">
        <%@ include file="/includes/decorators/aui-layout/notifications-header.jsp" %>
        <%@ include file="/includes/decorators/unsupported-browsers.jsp" %>
        <%@ include file="/includes/decorators/aui-layout/header-nodecorator.jsp" %>
    </header>
    <%@ include file="/includes/decorators/aui-layout/notifications-content.jsp" %>
    <div id="content">
