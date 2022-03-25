class ModuleConfig {
  // 端口号
  readonly port = 3000;

  // 数据库配置
  readonly db = {
    host: "175.24.235.246",
    database: "?authSource=admin",
    port: 27017,
    user: "admin",
    password: "admin111",
  };

  // 接口前缀
  readonly api_prefix = "/api";

  // 上传图片存放目录
  readonly upload_path = "public/upload/images/";

  // 上传图片大小限制
  readonly upload_img_size = 5 * 1024 * 1024;

  // token长度
  readonly token_size = 28;
}

const config = new ModuleConfig();

export default config;
