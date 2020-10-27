#基于哪个镜像
From java:8
#将本地文件夹挂在到当前容器
VOLUME /tmp
#复制文件到容器
ADD ./target/yhwage-0.0.1.jar /app.jar
#声明需要暴露的端口
EXPOSE 9301
#配置容器启动后执行的命令
ENTRYPOINT ["java","-jar","-Xms64M","-Xmx64M","/app.jar"]