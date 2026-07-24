"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product, ProductCategory, Availability, JadeColor } from "@/data/products";
import type { Article } from "@/data/articles";
import type { Site } from "@/data/site";
import type { NavItem } from "@/data/navigation";
import type { TrustPoint, ServicePanelItem } from "@/data/services";
import type { HomeBlock, TestimonialsSection } from "@/data/home";
import type { Testimonial } from "@/data/testimonials";
import { Button, Card, Field, Guide, Input, Row, Select, Textarea } from "./ui";
import ImageField from "./ImageField";

type HomeDoc = {
  hero: HomeBlock;
  story: HomeBlock;
  certification: HomeBlock;
  testimonialsSection: TestimonialsSection;
  trustPoints: TrustPoint[];
  servicePanels: ServicePanelItem[];
  certificationChecklist: string[];
};
type NavDoc = { navigation: NavItem[] };
type ProductsDoc = { products: Product[] };
type ArticlesDoc = { articles: Article[] };
type TestimonialsDoc = { testimonials: Testimonial[] };

/** Hook nạp & lưu một file JSON nội dung. */
function useDoc<T>(file: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const r = await fetch(`/api/admin/content?file=${file}`, { cache: "no-store" });
      const j = (await r.json()) as { data?: T; error?: string };
      if (!r.ok) throw new Error(j.error || "Không tải được nội dung");
      setData(j.data as T);
      setDirty(false);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Lỗi tải nội dung");
    } finally {
      setLoading(false);
    }
  }, [file]);

  useEffect(() => {
    // Nạp nội dung một lần khi mở tab. Đây là fetch phía client nên bắt buộc
    // chạy trong effect và setState sau khi có dữ liệu — chấp nhận có chủ đích.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  function update(fn: (draft: T) => void) {
    setData((cur) => {
      if (cur == null) return cur;
      const next = structuredClone(cur);
      fn(next);
      return next;
    });
    setDirty(true);
    setMsg(null);
  }

  async function save() {
    if (data == null) return;
    setSaving(true);
    setErr(null);
    setMsg(null);
    try {
      const r = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file, data }),
      });
      const j = (await r.json()) as { error?: string; mode?: string };
      if (!r.ok) throw new Error(j.error || "Lưu thất bại");
      setDirty(false);
      setMsg(
        j.mode === "github"
          ? "Đã lưu vào GitHub. Website sẽ cập nhật sau khoảng 1 phút (Vercel tự deploy)."
          : "Đã lưu vào file trên máy (chế độ local)."
      );
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  }

  return { data, update, save, load, loading, saving, dirty, msg, err };
}

function SaveBar({
  dirty,
  saving,
  msg,
  err,
  onSave,
  onReload,
}: {
  dirty: boolean;
  saving: boolean;
  msg: string | null;
  err: string | null;
  onSave: () => void;
  onReload: () => void;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-4 flex flex-wrap items-center gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-sm">
      <Button onClick={onSave} disabled={saving || !dirty}>
        {saving ? "Đang lưu…" : dirty ? "Lưu thay đổi" : "Đã lưu"}
      </Button>
      <Button variant="ghost" onClick={onReload} disabled={saving}>
        Tải lại
      </Button>
      {msg ? <span className="text-[12px] text-jade-deep">{msg}</span> : null}
      {err ? <span className="text-[12px] text-red-600">{err}</span> : null}
    </div>
  );
}

function BlockEditor({
  title,
  guide,
  block,
  onChange,
  imgW,
  imgH,
}: {
  title: string;
  guide?: string;
  block: HomeBlock;
  onChange: (fn: (b: HomeBlock) => void) => void;
  imgW: number;
  imgH: number;
}) {
  return (
    <Card title={title}>
      {guide ? <Guide>{guide}</Guide> : null}
      <Row>
        <Field label="Nhãn nhỏ (eyebrow)">
          <Input value={block.eyebrow} onChange={(e) => onChange((b) => void (b.eyebrow = e.target.value))} />
        </Field>
        <Field label="Nút — chữ">
          <Input value={block.ctaLabel} onChange={(e) => onChange((b) => void (b.ctaLabel = e.target.value))} />
        </Field>
        <Field label="Tiêu đề dòng 1">
          <Input value={block.titleLine1} onChange={(e) => onChange((b) => void (b.titleLine1 = e.target.value))} />
        </Field>
        <Field label="Tiêu đề dòng 2 (in nghiêng)">
          <Input value={block.titleLine2} onChange={(e) => onChange((b) => void (b.titleLine2 = e.target.value))} />
        </Field>
        <Field label="Nút — đường dẫn">
          <Input value={block.ctaHref} onChange={(e) => onChange((b) => void (b.ctaHref = e.target.value))} />
        </Field>
      </Row>
      <Field label="Đoạn mô tả">
        <Textarea value={block.body} onChange={(e) => onChange((b) => void (b.body = e.target.value))} />
      </Field>
      <ImageField
        label="Ảnh"
        value={block.image}
        width={imgW}
        height={imgH}
        hint={`Ảnh sẽ tự resize ${imgW}×${imgH} và nén WebP.`}
        onChange={(p) => onChange((b) => void (b.image = p))}
      />
      <Field label="Mô tả ảnh (alt — cho SEO & người khiếm thị)">
        <Input value={block.imageAlt} onChange={(e) => onChange((b) => void (b.imageAlt = e.target.value))} />
      </Field>
    </Card>
  );
}

/* ---------------------------------- Tabs ---------------------------------- */

function ContentTab() {
  const home = useDoc<HomeDoc>("home.json");
  const site = useDoc<Site>("site.json");
  const nav = useDoc<NavDoc>("navigation.json");
  const tst = useDoc<TestimonialsDoc>("testimonials.json");

  return (
    <div className="flex flex-col gap-8">
      {/* Home blocks */}
      <div className="flex flex-col gap-5">
        <h2 className="font-heading text-[22px] text-text-primary">Trang chủ</h2>
        <Guide>
          Trang chủ gồm nhiều khối nội dung xếp từ trên xuống. Mỗi khối có tiêu đề, mô tả, ảnh và nút bấm.
          Sau khi sửa xong bấm <strong>Lưu thay đổi</strong> — website tự cập nhật sau ~1 phút.
        </Guide>
        {home.loading ? <p className="text-[13px] text-text-secondary">Đang tải…</p> : null}
        {home.data ? (
          <>
            <BlockEditor
              title="Khối Hero (banner đầu trang)"
              guide="Đây là ảnh và chữ đầu tiên khách thấy khi vào trang chủ. Ảnh nên chụp ngang (landscape), nền tối hoặc trung tính để chữ trắng nổi rõ. Kích thước lý tưởng 2200×1467px — hệ thống sẽ tự resize nếu ảnh lớn hơn."
              block={home.data.hero}
              imgW={2200}
              imgH={1467}
              onChange={(fn) => home.update((d) => fn(d.hero))}
            />
            <BlockEditor
              title="Khối Câu chuyện"
              guide="Nằm giữa trang chủ, giới thiệu về thương hiệu MJADE và hành trình mang ngọc đến khách hàng. Ảnh dọc (portrait) 1200×1500px — thường là ảnh editorial hoặc ảnh người mẫu đeo ngọc."
              block={home.data.story}
              imgW={1200}
              imgH={1500}
              onChange={(fn) => home.update((d) => fn(d.story))}
            />
            <BlockEditor
              title="Khối Kiểm định"
              guide="Giới thiệu quy trình kiểm định ngọc Type A 100% của MJADE. Nên dùng ảnh giấy kiểm định hoặc ảnh thợ đang kiểm tra ngọc. Ảnh dọc 1200×1600px."
              block={home.data.certification}
              imgW={1200}
              imgH={1600}
              onChange={(fn) => home.update((d) => fn(d.certification))}
            />

            <Card title="3 điểm mạnh dưới Hero (USP)">
              <Guide>
                Ba dòng ngắn hiện ngay dưới banner đầu trang, tóm tắt lý do khách nên chọn MJADE.
                Mỗi USP gồm một biểu tượng và một vài dòng chữ. Nên viết ngắn gọn, dễ hiểu.
              </Guide>
              {home.data.trustPoints.map((tp, i) => (
                <Row key={i}>
                  <Field label={`USP ${i + 1} — chữ (xuống dòng bằng Enter)`}>
                    <Textarea
                      className="min-h-[60px]"
                      value={tp.title}
                      onChange={(e) => home.update((d) => void (d.trustPoints[i].title = e.target.value))}
                    />
                  </Field>
                  <Field label="Biểu tượng">
                    <Select
                      value={tp.icon}
                      onChange={(e) =>
                        home.update((d) => void (d.trustPoints[i].icon = e.target.value as TrustPoint["icon"]))
                      }
                    >
                      <option value="gem">Viên ngọc</option>
                      <option value="store">Cửa hàng</option>
                      <option value="badge">Chứng nhận</option>
                    </Select>
                  </Field>
                </Row>
              ))}
            </Card>

            <Card title="2 ô dịch vụ (cạnh sản phẩm nổi bật)">
              <Guide>
                Hai ô này nằm cạnh phần sản phẩm nổi bật trên trang chủ, giới thiệu dịch vụ tư vấn và kiểm định.
                Mỗi ô có tiêu đề, mô tả ngắn, biểu tượng và nút dẫn tới trang tương ứng.
              </Guide>
              {home.data.servicePanels.map((sp, i) => (
                <div key={i} className="flex flex-col gap-3 border-t border-border pt-4 first:border-0 first:pt-0">
                  <Row>
                    <Field label="Tiêu đề">
                      <Input value={sp.title} onChange={(e) => home.update((d) => void (d.servicePanels[i].title = e.target.value))} />
                    </Field>
                    <Field label="Biểu tượng">
                      <Select
                        value={sp.icon}
                        onChange={(e) =>
                          home.update((d) => void (d.servicePanels[i].icon = e.target.value as ServicePanelItem["icon"]))
                        }
                      >
                        <option value="user">Người (tư vấn)</option>
                        <option value="shield">Khiên (kiểm định)</option>
                      </Select>
                    </Field>
                    <Field label="Nút — chữ">
                      <Input value={sp.linkLabel} onChange={(e) => home.update((d) => void (d.servicePanels[i].linkLabel = e.target.value))} />
                    </Field>
                    <Field label="Nút — đường dẫn">
                      <Input value={sp.href} onChange={(e) => home.update((d) => void (d.servicePanels[i].href = e.target.value))} />
                    </Field>
                  </Row>
                  <Field label="Mô tả">
                    <Textarea value={sp.description} onChange={(e) => home.update((d) => void (d.servicePanels[i].description = e.target.value))} />
                  </Field>
                </div>
              ))}
            </Card>

            <Card title="Danh sách cam kết (khối Kiểm định)">
              <Guide>
                Các gạch đầu dòng hiện bên cạnh ảnh kiểm định trên trang chủ. Mỗi dòng là một cam kết của MJADE
                (ví dụ: &quot;Ngọc phỉ thuý Type A 100% tự nhiên&quot;). Viết mỗi cam kết trên một dòng riêng.
              </Guide>
              <Field label="Mỗi dòng là một gạch đầu dòng">
                <Textarea
                  className="min-h-[110px]"
                  value={home.data.certificationChecklist.join("\n")}
                  onChange={(e) =>
                    home.update((d) => void (d.certificationChecklist = e.target.value.split("\n").filter(Boolean)))
                  }
                />
              </Field>
            </Card>

            <Card title="Tiêu đề khối cảm nhận khách hàng">
              <Guide>
                Tiêu đề phần cảm nhận khách hàng trên trang chủ. Phần &quot;in nghiêng&quot; sẽ hiện dưới dạng chữ nghiêng, tạo điểm nhấn.
              </Guide>
              <Row>
                <Field label="Nhãn nhỏ">
                  <Input value={home.data.testimonialsSection.eyebrow} onChange={(e) => home.update((d) => void (d.testimonialsSection.eyebrow = e.target.value))} />
                </Field>
                <Field label="Tiêu đề (phần thường)">
                  <Input value={home.data.testimonialsSection.titlePlain} onChange={(e) => home.update((d) => void (d.testimonialsSection.titlePlain = e.target.value))} />
                </Field>
                <Field label="Tiêu đề (phần in nghiêng)">
                  <Input value={home.data.testimonialsSection.titleItalic} onChange={(e) => home.update((d) => void (d.testimonialsSection.titleItalic = e.target.value))} />
                </Field>
              </Row>
            </Card>
          </>
        ) : null}
        <SaveBar dirty={home.dirty} saving={home.saving} msg={home.msg} err={home.err} onSave={home.save} onReload={home.load} />
      </div>

      {/* Testimonials */}
      <div className="flex flex-col gap-5">
        <h2 className="font-heading text-[22px] text-text-primary">Cảm nhận khách hàng</h2>
        <Guide>
          Mỗi cảm nhận gồm ảnh chân dung vuông (600×600px), tên khách, chức danh (tuỳ chọn), và trích dẫn nguyên văn.
          Chỉ đăng trích dẫn đã được khách đồng ý công khai. Nếu có link bài gốc trên Facebook, điền vào để tăng độ tin cậy.
        </Guide>
        {tst.data?.testimonials.map((t, i) => (
          <Card key={i} title={t.name || `Khách ${i + 1}`}>
            <Row>
              <Field label="Tên">
                <Input value={t.name} onChange={(e) => tst.update((d) => void (d.testimonials[i].name = e.target.value))} />
              </Field>
              <Field label="Chức danh (để trống nếu không có)">
                <Input value={t.role ?? ""} onChange={(e) => tst.update((d) => void (d.testimonials[i].role = e.target.value || null))} />
              </Field>
            </Row>
            <Field label="Trích dẫn (nguyên lời khách)">
              <Textarea value={t.quote} onChange={(e) => tst.update((d) => void (d.testimonials[i].quote = e.target.value))} />
            </Field>
            <ImageField
              label="Ảnh chân dung"
              value={t.image}
              width={600}
              height={600}
              onChange={(p) => tst.update((d) => void (d.testimonials[i].image = p))}
            />
            <Row>
              <Field label="Mô tả ảnh (alt)">
                <Input value={t.imageAlt} onChange={(e) => tst.update((d) => void (d.testimonials[i].imageAlt = e.target.value))} />
              </Field>
              <Field label="Link bài gốc (Facebook)">
                <Input value={t.source} onChange={(e) => tst.update((d) => void (d.testimonials[i].source = e.target.value))} />
              </Field>
            </Row>
            <Button
              variant="danger"
              onClick={() => tst.update((d) => void d.testimonials.splice(i, 1))}
              className="self-start"
            >
              Xoá cảm nhận này
            </Button>
          </Card>
        ))}
        <Button
          variant="ghost"
          className="self-start"
          onClick={() =>
            tst.update((d) =>
              void d.testimonials.push({
                name: "Khách hàng mới",
                role: null,
                quote: "",
                image: "/images/home/testimonial-tammy.webp",
                imageAlt: "",
                source: "",
              })
            )
          }
        >
          + Thêm cảm nhận
        </Button>
        <SaveBar dirty={tst.dirty} saving={tst.saving} msg={tst.msg} err={tst.err} onSave={tst.save} onReload={tst.load} />
      </div>

      {/* Site info */}
      <div className="flex flex-col gap-5">
        <h2 className="font-heading text-[22px] text-text-primary">Thông tin thương hiệu & liên hệ</h2>
        <Guide>
          Thông tin ở đây hiện trên footer, trang Về MJADE, trang Liên hệ, và thẻ meta SEO khi chia sẻ trên mạng xã hội.
        </Guide>
        {site.data ? (
          <>
            <Card title="Thương hiệu">
              <Guide>
                Tên và các dòng mô tả thương hiệu. &quot;Tagline&quot; là câu slogan chính.
                &quot;Mô tả SEO&quot; là đoạn văn ngắn Google hiện khi ai đó tìm kiếm MJADE.
              </Guide>
              <Row>
                <Field label="Tên">
                  <Input value={site.data.name} onChange={(e) => site.update((d) => void (d.name = e.target.value))} />
                </Field>
                <Field label="Dòng thương hiệu (tiếng Anh)">
                  <Input value={site.data.brandLine} onChange={(e) => site.update((d) => void (d.brandLine = e.target.value))} />
                </Field>
                <Field label="Tagline">
                  <Input value={site.data.tagline} onChange={(e) => site.update((d) => void (d.tagline = e.target.value))} />
                </Field>
                <Field label="Mô tả ngắn dưới logo">
                  <Input value={site.data.descriptor} onChange={(e) => site.update((d) => void (d.descriptor = e.target.value))} />
                </Field>
              </Row>
              <Field label="Câu tinh thần thương hiệu">
                <Input value={site.data.essence} onChange={(e) => site.update((d) => void (d.essence = e.target.value))} />
              </Field>
              <Field label="Mô tả SEO của website">
                <Textarea value={site.data.description} onChange={(e) => site.update((d) => void (d.description = e.target.value))} />
              </Field>
            </Card>

            <Card title="Liên hệ">
              <Guide>
                Email và hotline hiện ở footer, trang Liên hệ, và dùng cho các form tư vấn trên site.
              </Guide>
              <Row>
                <Field label="Email">
                  <Input value={site.data.email} onChange={(e) => site.update((d) => void (d.email = e.target.value))} />
                </Field>
                <Field label="Hotline">
                  <Input value={site.data.phone} onChange={(e) => site.update((d) => void (d.phone = e.target.value))} />
                </Field>
              </Row>
            </Card>

            <Card title="Hệ thống showroom">
              <Guide>
                Danh sách showroom hiện ở footer trang web. Bấm &quot;+ Thêm showroom&quot; nếu mở thêm cửa hàng.
              </Guide>
              {site.data.stores.map((s, i) => (
                <Row key={i}>
                  <Field label={`Showroom ${i + 1} — thành phố`}>
                    <Input value={s.city} onChange={(e) => site.update((d) => void (d.stores[i].city = e.target.value))} />
                  </Field>
                  <Field label="Địa chỉ">
                    <Input value={s.address} onChange={(e) => site.update((d) => void (d.stores[i].address = e.target.value))} />
                  </Field>
                </Row>
              ))}
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => site.update((d) => void d.stores.push({ city: "", address: "" }))}>
                  + Thêm showroom
                </Button>
                {site.data.stores.length > 1 ? (
                  <Button variant="danger" onClick={() => site.update((d) => void d.stores.pop())}>
                    Xoá showroom cuối
                  </Button>
                ) : null}
              </div>
            </Card>
            <SaveBar dirty={site.dirty} saving={site.saving} msg={site.msg} err={site.err} onSave={site.save} onReload={site.load} />
          </>
        ) : null}
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-5">
        <h2 className="font-heading text-[22px] text-text-primary">Menu điều hướng</h2>
        <Guide>
          Thứ tự các mục trên thanh menu chính (đầu trang). Đường dẫn bắt đầu bằng / (ví dụ: /bo-suu-tap).
          Bấm &quot;+ Thêm mục&quot; nếu muốn thêm trang mới vào menu. Kéo thứ tự bằng cách xoá rồi thêm lại ở vị trí mong muốn.
        </Guide>
        {nav.data ? (
          <>
            <Card title="Các mục menu (theo thứ tự hiển thị)">
              {nav.data.navigation.map((n, i) => (
                <Row key={i}>
                  <Field label={`Mục ${i + 1} — tên`}>
                    <Input value={n.label} onChange={(e) => nav.update((d) => void (d.navigation[i].label = e.target.value))} />
                  </Field>
                  <Field label="Đường dẫn">
                    <Input value={n.href} onChange={(e) => nav.update((d) => void (d.navigation[i].href = e.target.value))} />
                  </Field>
                </Row>
              ))}
              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => nav.update((d) => void d.navigation.push({ label: "", href: "/" }))}>
                  + Thêm mục
                </Button>
                <Button variant="danger" onClick={() => nav.update((d) => void d.navigation.pop())}>
                  Xoá mục cuối
                </Button>
              </div>
            </Card>
            <SaveBar dirty={nav.dirty} saving={nav.saving} msg={nav.msg} err={nav.err} onSave={nav.save} onReload={nav.load} />
          </>
        ) : null}
      </div>
    </div>
  );
}

function newProduct(): Product {
  const ts = Date.now().toString(36);
  return {
    id: `sp-${ts}`,
    slug: `san-pham-moi-${ts}`,
    name: "Sản phẩm mới",
    shortName: "Sản phẩm mới",
    productCode: `MJ-${ts.toUpperCase()}`,
    category: "mat-day-chuyen",
    collection: "signature",
    priceVnd: null,
    availability: "lien-he",
    stockQuantity: null,
    limited: false,
    featured: false,
    images: [],
    thumbnail: "",
    imageAlt: "",
    imageIsTemporary: true,
    jadeType: "Jadeite Type A",
    origin: "Myanmar",
    color: null,
    colorLabel: null,
    translucency: null,
    texture: null,
    dimensions: null,
    weight: null,
    metal: null,
    certificateAvailable: false,
    certificateIssuer: null,
    certificateNumber: null,
    certificateImage: null,
    certificatePdf: null,
    certificateVerificationUrl: null,
    shortDescription: "",
    story: "",
    careInstructions: [
      "Tránh va chạm mạnh",
      "Không để tiếp xúc hoá chất, nước hoa, xà phòng",
      "Lau bằng vải mềm sau khi đeo",
    ],
    shippingNotes: "Giao hàng trong hộp quà cao cấp, kèm giấy kiểm định (nếu có).",
    seoTitle: "",
    seoDescription: "",
  };
}

function ProductsTab() {
  const doc = useDoc<ProductsDoc>("products.json");
  const [idx, setIdx] = useState(0);
  const p = doc.data?.products[idx];

  return (
    <div className="flex flex-col gap-5">
      <Guide>
        Mỗi sản phẩm có trang riêng tại <strong>/san-pham/[slug]</strong>.
        Bạn có thể thêm sản phẩm mới, sửa thông tin sản phẩm đang bán, hoặc xoá sản phẩm đã ngừng kinh doanh.
        Nhớ bấm <strong>Lưu thay đổi</strong> sau khi sửa xong.
      </Guide>
      {doc.loading ? <p className="text-[13px] text-text-secondary">Đang tải…</p> : null}
      {doc.data ? (
        <>
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-[260px] flex-1">
              <Field label="Chọn sản phẩm">
                <Select value={idx} onChange={(e) => setIdx(Number(e.target.value))}>
                  {doc.data.products.map((x, i) => (
                    <option key={x.id} value={i}>
                      {x.name} — {x.productCode}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                doc.update((d) => void d.products.push(newProduct()));
                setIdx(doc.data!.products.length);
              }}
            >
              + Thêm sản phẩm
            </Button>
            {doc.data.products.length > 1 ? (
              <Button
                variant="danger"
                onClick={() => {
                  if (!confirm(`Xoá sản phẩm "${p?.name}"? Thao tác này không thể hoàn tác sau khi bấm Lưu.`)) return;
                  doc.update((d) => void d.products.splice(idx, 1));
                  setIdx(0);
                }}
              >
                Xoá sản phẩm này
              </Button>
            ) : null}
          </div>

          {p ? (
            <>
              <Card title="Thông tin chính">
                <Guide>
                  Tên và mã hiện trên thẻ sản phẩm. <strong>Slug</strong> là phần cuối đường dẫn URL (ví dụ: &quot;nhan-ngoc-xanh&quot; → trang sẽ là /san-pham/nhan-ngoc-xanh) — chỉ dùng chữ thường, số và gạch ngang.
                  Giá để trống thì trang sẽ hiện &quot;Liên hệ tư vấn&quot; thay vì số tiền.
                </Guide>
                <Row>
                  <Field label="Tên sản phẩm">
                    <Input value={p.name} onChange={(e) => doc.update((d) => void (d.products[idx].name = e.target.value))} />
                  </Field>
                  <Field label="Slug (đường dẫn URL)">
                    <Input
                      value={p.slug}
                      onChange={(e) => doc.update((d) => void (d.products[idx].slug = e.target.value))}
                      placeholder="vi-du: nhan-ngoc-xanh"
                    />
                  </Field>
                  <Field label="Mã sản phẩm">
                    <Input value={p.productCode} onChange={(e) => doc.update((d) => void (d.products[idx].productCode = e.target.value))} />
                  </Field>
                  <Field label="Giá (VNĐ) — để trống = 'Liên hệ tư vấn'">
                    <Input
                      type="number"
                      value={p.priceVnd ?? ""}
                      onChange={(e) =>
                        doc.update((d) => void (d.products[idx].priceVnd = e.target.value === "" ? null : Number(e.target.value)))
                      }
                    />
                  </Field>
                  <Field label="Loại sản phẩm">
                    <Select
                      value={p.category}
                      onChange={(e) => doc.update((d) => void (d.products[idx].category = e.target.value as ProductCategory))}
                    >
                      <option value="vong-ban">Vòng bản</option>
                      <option value="vong-tay">Vòng tay</option>
                      <option value="nhan">Nhẫn</option>
                      <option value="mat-day-chuyen">Mặt dây chuyền</option>
                      <option value="day-chuyen">Dây chuyền</option>
                      <option value="hoa-tai">Hoa tai</option>
                    </Select>
                  </Field>
                  <Field label="Bộ sưu tập">
                    <Select
                      value={p.collection}
                      onChange={(e) => doc.update((d) => void (d.products[idx].collection = e.target.value as "signature" | "limited"))}
                    >
                      <option value="signature">Signature (chính)</option>
                      <option value="limited">Limited (giới hạn)</option>
                    </Select>
                  </Field>
                  <Field label="Tình trạng">
                    <Select
                      value={p.availability}
                      onChange={(e) => doc.update((d) => void (d.products[idx].availability = e.target.value as Availability))}
                    >
                      <option value="con-hang">Còn hàng</option>
                      <option value="chi-con-1">Chỉ còn 1</option>
                      <option value="da-dat-truoc">Đã đặt trước</option>
                      <option value="da-ban">Đã bán</option>
                      <option value="lien-he">Liên hệ tư vấn</option>
                    </Select>
                  </Field>
                  <Field label="Màu ngọc">
                    <Select
                      value={p.color ?? ""}
                      onChange={(e) => doc.update((d) => void (d.products[idx].color = (e.target.value || null) as JadeColor | null))}
                    >
                      <option value="">— Chưa chọn —</option>
                      <option value="xanh-luc">Xanh lục</option>
                      <option value="xanh-dam">Xanh đậm</option>
                      <option value="xanh-nhat">Xanh nhạt</option>
                      <option value="trang">Trắng</option>
                      <option value="lavender">Lavender</option>
                    </Select>
                  </Field>
                </Row>
                <Field label="Tên ngắn (hiện trên thẻ sản phẩm — xuống dòng bằng Enter)">
                  <Textarea className="min-h-[60px]" value={p.shortName} onChange={(e) => doc.update((d) => void (d.products[idx].shortName = e.target.value))} />
                </Field>
                <Field label="Mô tả ngắn">
                  <Textarea value={p.shortDescription} onChange={(e) => doc.update((d) => void (d.products[idx].shortDescription = e.target.value))} />
                </Field>
                <Field label="Câu chuyện của viên ngọc">
                  <Textarea className="min-h-[130px]" value={p.story} onChange={(e) => doc.update((d) => void (d.products[idx].story = e.target.value))} />
                </Field>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2 text-[13px]">
                    <input type="checkbox" checked={p.featured} onChange={(e) => doc.update((d) => void (d.products[idx].featured = e.target.checked))} />
                    Hiện ở &quot;Bộ sưu tập nổi bật&quot; (trang chủ)
                  </label>
                  <label className="flex items-center gap-2 text-[13px]">
                    <input type="checkbox" checked={p.limited} onChange={(e) => doc.update((d) => void (d.products[idx].limited = e.target.checked))} />
                    Thuộc bộ sưu tập giới hạn
                  </label>
                </div>
              </Card>

              <Card title="Hình ảnh">
                <Guide>
                  Ảnh thẻ (thumbnail) hiện ở trang chủ và danh sách bộ sưu tập. Ảnh chi tiết hiện khi bấm vào sản phẩm.
                  Tỷ lệ 4:5 (ảnh dọc). Nếu chưa có ảnh sản phẩm thật, hãy tick &quot;ảnh minh hoạ tạm&quot; — trang sẽ hiện
                  ghi chú trung thực cho khách biết.
                </Guide>
                <ImageField
                  label="Ảnh thẻ (trang chủ / danh sách) — 4:5"
                  value={p.thumbnail}
                  width={1200}
                  height={1500}
                  onChange={(path) => doc.update((d) => void (d.products[idx].thumbnail = path))}
                />
                <ImageField
                  label="Ảnh trang chi tiết — 4:5"
                  value={p.images[0] ?? ""}
                  width={1200}
                  height={1500}
                  onChange={(path) => doc.update((d) => void (d.products[idx].images[0] = path))}
                />
                <Field label="Mô tả ảnh (alt)">
                  <Input value={p.imageAlt} onChange={(e) => doc.update((d) => void (d.products[idx].imageAlt = e.target.value))} />
                </Field>
                <label className="flex items-center gap-2 text-[13px]">
                  <input
                    type="checkbox"
                    checked={p.imageIsTemporary}
                    onChange={(e) => doc.update((d) => void (d.products[idx].imageIsTemporary = e.target.checked))}
                  />
                  Đây là ảnh minh hoạ tạm (site sẽ hiện ghi chú trung thực)
                </label>
              </Card>

              <Card title="Thông số ngọc">
                <Guide>
                  Chỉ điền thông số đã kiểm chứng thực tế. Trường nào để trống sẽ tự động ẩn trên trang sản phẩm, không hiện ra cho khách.
                  <strong> Tuyệt đối không bịa số liệu.</strong>
                </Guide>
                <Row>
                  <Field label="Nguồn gốc">
                    <Input value={p.origin ?? ""} onChange={(e) => doc.update((d) => void (d.products[idx].origin = e.target.value || null))} />
                  </Field>
                  <Field label="Tên màu hiển thị">
                    <Input value={p.colorLabel ?? ""} onChange={(e) => doc.update((d) => void (d.products[idx].colorLabel = e.target.value || null))} />
                  </Field>
                  <Field label="Độ trong">
                    <Input value={p.translucency ?? ""} onChange={(e) => doc.update((d) => void (d.products[idx].translucency = e.target.value || null))} />
                  </Field>
                  <Field label="Kết cấu">
                    <Input value={p.texture ?? ""} onChange={(e) => doc.update((d) => void (d.products[idx].texture = e.target.value || null))} />
                  </Field>
                  <Field label="Kích thước">
                    <Input value={p.dimensions ?? ""} onChange={(e) => doc.update((d) => void (d.products[idx].dimensions = e.target.value || null))} />
                  </Field>
                  <Field label="Trọng lượng">
                    <Input value={p.weight ?? ""} onChange={(e) => doc.update((d) => void (d.products[idx].weight = e.target.value || null))} />
                  </Field>
                  <Field label="Kim loại (để trống nếu ngọc nguyên khối)">
                    <Input value={p.metal ?? ""} onChange={(e) => doc.update((d) => void (d.products[idx].metal = e.target.value || null))} />
                  </Field>
                </Row>
              </Card>

              <Card title="Giấy kiểm định">
                <Guide>
                  Chỉ điền khi đã có giấy kiểm định thật từ phòng kiểm định uy tín.
                  <strong> Tuyệt đối không bịa tên lab hay số chứng thư.</strong> Nếu chưa có giấy kiểm định,
                  bỏ trống tất cả — trang sẽ hiện dòng &quot;Đang cập nhật chứng thư kiểm định&quot; thay vì thông tin giả.
                </Guide>
                <label className="flex items-center gap-2 text-[13px]">
                  <input
                    type="checkbox"
                    checked={p.certificateAvailable}
                    onChange={(e) => doc.update((d) => void (d.products[idx].certificateAvailable = e.target.checked))}
                  />
                  Đã có giấy kiểm định
                </label>
                {p.certificateAvailable ? (
                  <>
                    <Row>
                      <Field label="Tên phòng kiểm định">
                        <Input
                          value={p.certificateIssuer ?? ""}
                          onChange={(e) => doc.update((d) => void (d.products[idx].certificateIssuer = e.target.value || null))}
                          placeholder="VD: Myanmar Treasure Lab"
                        />
                      </Field>
                      <Field label="Số chứng thư">
                        <Input
                          value={p.certificateNumber ?? ""}
                          onChange={(e) => doc.update((d) => void (d.products[idx].certificateNumber = e.target.value || null))}
                        />
                      </Field>
                    </Row>
                    <ImageField
                      label="Ảnh giấy kiểm định"
                      value={p.certificateImage ?? ""}
                      width={1200}
                      height={1600}
                      onChange={(path) => doc.update((d) => void (d.products[idx].certificateImage = path || null))}
                    />
                    <Field label="Link xác minh online (nếu lab có hệ thống tra cứu)">
                      <Input
                        value={p.certificateVerificationUrl ?? ""}
                        onChange={(e) => doc.update((d) => void (d.products[idx].certificateVerificationUrl = e.target.value || null))}
                        placeholder="https://..."
                      />
                    </Field>
                  </>
                ) : null}
              </Card>

              <Card title="Bảo quản & giao hàng">
                <Guide>
                  Hướng dẫn bảo quản hiện ở cuối trang sản phẩm. Mỗi dòng là một mục. Ghi chú giao hàng hiện bên cạnh nút đặt giữ.
                </Guide>
                <Field label="Hướng dẫn bảo quản (mỗi dòng là một mục)">
                  <Textarea
                    className="min-h-[90px]"
                    value={(p.careInstructions ?? []).join("\n")}
                    onChange={(e) =>
                      doc.update(
                        (d) => void (d.products[idx].careInstructions = e.target.value.split("\n").filter(Boolean))
                      )
                    }
                  />
                </Field>
                <Field label="Ghi chú giao hàng">
                  <Textarea
                    value={p.shippingNotes ?? ""}
                    onChange={(e) => doc.update((d) => void (d.products[idx].shippingNotes = e.target.value))}
                  />
                </Field>
              </Card>

              <Card title="SEO (tối ưu tìm kiếm Google)">
                <Guide>
                  Tiêu đề SEO hiện trên tab trình duyệt và kết quả Google. Mô tả SEO là đoạn 2–3 câu mô tả sản phẩm cho Google.
                  Nếu để trống, hệ thống sẽ tự dùng tên và mô tả ngắn của sản phẩm.
                </Guide>
                <Row>
                  <Field label="Tiêu đề SEO">
                    <Input
                      value={p.seoTitle ?? ""}
                      onChange={(e) => doc.update((d) => void (d.products[idx].seoTitle = e.target.value))}
                      placeholder="VD: Nhẫn Ngọc Phỉ Thuý Type A — MJADE"
                    />
                  </Field>
                </Row>
                <Field label="Mô tả SEO">
                  <Textarea
                    value={p.seoDescription ?? ""}
                    onChange={(e) => doc.update((d) => void (d.products[idx].seoDescription = e.target.value))}
                    placeholder="2–3 câu mô tả sản phẩm cho Google (150–160 ký tự)"
                  />
                </Field>
              </Card>
            </>
          ) : null}
          <SaveBar dirty={doc.dirty} saving={doc.saving} msg={doc.msg} err={doc.err} onSave={doc.save} onReload={doc.load} />
        </>
      ) : null}
    </div>
  );
}

function ArticlesTab() {
  const doc = useDoc<ArticlesDoc>("articles.json");
  const [idx, setIdx] = useState(0);
  const a = doc.data?.articles[idx];

  return (
    <div className="flex flex-col gap-5">
      <Guide>
        Bài viết hiện ở trang <strong>Tin tức</strong> hoặc <strong>Cẩm nang ngọc</strong> tuỳ chuyên mục.
        Mỗi bài có đường dẫn riêng tại /tin-tuc/[slug]. Bạn có thể thêm bài mới, sửa nội dung, hoặc xoá bài cũ.
      </Guide>
      {doc.loading ? <p className="text-[13px] text-text-secondary">Đang tải…</p> : null}
      {doc.data ? (
        <>
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-[260px] flex-1">
              <Field label="Chọn bài viết">
                <Select value={idx} onChange={(e) => setIdx(Number(e.target.value))}>
                  {doc.data.articles.map((x, i) => (
                    <option key={x.slug} value={i}>
                      {x.title}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                doc.update((d) =>
                  void d.articles.unshift({
                    slug: "bai-viet-moi-" + Date.now().toString(36),
                    title: "Bài viết mới",
                    excerpt: "",
                    category: "cam-nang",
                    date: new Date().toISOString().slice(0, 10),
                    readingMinutes: 4,
                    image: null,
                    sections: [{ heading: "", body: [""] }],
                  })
                );
                setIdx(0);
              }}
            >
              + Bài mới
            </Button>
            {doc.data.articles.length > 1 ? (
              <Button
                variant="danger"
                onClick={() => {
                  if (!confirm(`Xoá bài "${a?.title}"? Thao tác này không thể hoàn tác sau khi bấm Lưu.`)) return;
                  doc.update((d) => void d.articles.splice(idx, 1));
                  setIdx(0);
                }}
              >
                Xoá bài này
              </Button>
            ) : null}
          </div>

          {a ? (
            <>
              <Card title="Thông tin bài viết">
                <Guide>
                  <strong>Slug</strong> là phần cuối đường dẫn URL — chỉ dùng chữ thường và gạch ngang
                  (ví dụ: &quot;cach-nhan-biet-ngoc-that&quot; → trang sẽ là /tin-tuc/cach-nhan-biet-ngoc-that).
                  Tóm tắt là đoạn ngắn hiện trên thẻ bài viết ở trang danh sách.
                </Guide>
                <Row>
                  <Field label="Tiêu đề">
                    <Input value={a.title} onChange={(e) => doc.update((d) => void (d.articles[idx].title = e.target.value))} />
                  </Field>
                  <Field label="Đường dẫn (slug — chỉ chữ thường, gạch ngang)">
                    <Input value={a.slug} onChange={(e) => doc.update((d) => void (d.articles[idx].slug = e.target.value))} />
                  </Field>
                  <Field label="Chuyên mục">
                    <Select value={a.category} onChange={(e) => doc.update((d) => void (d.articles[idx].category = e.target.value as Article["category"]))}>
                      <option value="cam-nang">Cẩm nang ngọc</option>
                      <option value="tin-tuc">Tin tức</option>
                    </Select>
                  </Field>
                  <Field label="Ngày đăng (YYYY-MM-DD)">
                    <Input value={a.date} onChange={(e) => doc.update((d) => void (d.articles[idx].date = e.target.value))} />
                  </Field>
                  <Field label="Số phút đọc">
                    <Input
                      type="number"
                      value={a.readingMinutes}
                      onChange={(e) => doc.update((d) => void (d.articles[idx].readingMinutes = Number(e.target.value) || 1))}
                    />
                  </Field>
                </Row>
                <Field label="Tóm tắt (hiện ở thẻ bài viết)">
                  <Textarea value={a.excerpt} onChange={(e) => doc.update((d) => void (d.articles[idx].excerpt = e.target.value))} />
                </Field>
                <ImageField
                  label="Ảnh bài viết (để trống nếu không có)"
                  value={a.image ?? ""}
                  width={1600}
                  height={1000}
                  onChange={(p) => doc.update((d) => void (d.articles[idx].image = p || null))}
                />
              </Card>

              <Card title="Nội dung bài viết">
                <Guide>
                  Mỗi bài gồm nhiều phần (section). Mỗi phần có một tiêu đề và nội dung bên dưới.
                  Để tách đoạn văn, cách nhau bằng <strong>một dòng trống</strong> (bấm Enter 2 lần).
                  Bấm &quot;+ Thêm phần&quot; để thêm mục mới vào bài.
                </Guide>
                {a.sections.map((s, si) => (
                  <div key={si} className="flex flex-col gap-3 border-t border-border pt-4 first:border-0 first:pt-0">
                    <Field label={`Phần ${si + 1} — tiêu đề`}>
                      <Input value={s.heading} onChange={(e) => doc.update((d) => void (d.articles[idx].sections[si].heading = e.target.value))} />
                    </Field>
                    <Field label="Nội dung (mỗi đoạn văn cách nhau bằng một dòng trống)">
                      <Textarea
                        className="min-h-[150px]"
                        value={s.body.join("\n\n")}
                        onChange={(e) =>
                          doc.update(
                            (d) =>
                              void (d.articles[idx].sections[si].body = e.target.value
                                .split(/\n\s*\n/)
                                .map((x) => x.trim())
                                .filter(Boolean))
                          )
                        }
                      />
                    </Field>
                    <Button
                      variant="danger"
                      className="self-start"
                      onClick={() => doc.update((d) => void d.articles[idx].sections.splice(si, 1))}
                    >
                      Xoá phần này
                    </Button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  className="self-start"
                  onClick={() => doc.update((d) => void d.articles[idx].sections.push({ heading: "", body: [""] }))}
                >
                  + Thêm phần
                </Button>
              </Card>
            </>
          ) : null}
          <SaveBar dirty={doc.dirty} saving={doc.saving} msg={doc.msg} err={doc.err} onSave={doc.save} onReload={doc.load} />
        </>
      ) : null}
    </div>
  );
}

function ImagesTab() {
  const site = useDoc<Site>("site.json");
  const [customPath, setCustomPath] = useState("/images/home/anh-moi.webp");

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-heading text-[22px] text-text-primary">Logo</h2>
      <Guide>
        Logo header là biểu tượng chim công nhỏ ở góc trái trên cùng. Logo footer là bản đầy đủ có chữ MJADE ở cuối trang.
        Nên dùng file <strong>PNG nền trong suốt</strong> để logo hòa đẹp với nền ivory của website.
      </Guide>
      {site.data ? (
        <>
          <Card title="Logo thương hiệu">
            <ImageField
              label="Logo trên header (chỉ hình chim công)"
              value={site.data.logo.emblem}
              width={560}
              hint="Nên dùng file PNG nền trong suốt. Ảnh sẽ được nén lại."
              onChange={(p) => site.update((d) => void (d.logo.emblem = p))}
            />
            <ImageField
              label="Logo đầy đủ ở footer (chim công + chữ)"
              value={site.data.logo.full}
              width={760}
              onChange={(p) => site.update((d) => void (d.logo.full = p))}
            />
          </Card>
          <SaveBar dirty={site.dirty} saving={site.saving} msg={site.msg} err={site.err} onSave={site.save} onReload={site.load} />
        </>
      ) : null}

      <h2 className="mt-4 font-heading text-[22px] text-text-primary">Tải ảnh bất kỳ</h2>
      <Guide>
        Dùng khi cần thay một ảnh cụ thể trên site mà không có ô chuyên dụng ở trên (ví dụ: ảnh chứng thư, ảnh editorial).
        Nhập đường dẫn ảnh cần thay (bắt đầu bằng /images/...), chọn file mới — hệ thống sẽ tự đặt tên file mới để tránh trình duyệt hiện ảnh cũ từ cache.
      </Guide>
      <Card title="Thay ảnh theo đường dẫn tự chọn">
        <Field label="Đường dẫn ảnh cần thay (ví dụ: /images/home/hero-banner.webp)">
          <Input value={customPath} onChange={(e) => setCustomPath(e.target.value)} />
        </Field>
        <ImageField label="Ảnh mới" value={customPath} onChange={setCustomPath} />
      </Card>
    </div>
  );
}

/* --------------------------------- Shell --------------------------------- */

const TABS = [
  { id: "content", label: "Nội dung trang" },
  { id: "products", label: "Sản phẩm" },
  { id: "articles", label: "Bài viết" },
  { id: "images", label: "Ảnh & Logo" },
] as const;

export default function AdminApp({ githubReady }: { githubReady: boolean }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("content");

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    location.reload();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-[26px] text-text-primary">Quản trị nội dung MJADE</h1>
          <p className="mt-1 text-[12px] text-text-secondary">
            {githubReady
              ? "Lưu thay đổi → tự cập nhật website sau khoảng 1 phút."
              : "⚠ Chưa cấu hình GITHUB_TOKEN / GITHUB_REPO — hiện chỉ lưu được khi chạy trên máy (local)."}
          </p>
        </div>
        <Button variant="ghost" onClick={logout}>
          Đăng xuất
        </Button>
      </header>

      <nav className="mb-6 flex flex-wrap gap-2 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`border-b-2 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.1em] transition-colors ${
              tab === t.id
                ? "border-jade-deep text-jade-deep"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "content" ? <ContentTab /> : null}
      {tab === "products" ? <ProductsTab /> : null}
      {tab === "articles" ? <ArticlesTab /> : null}
      {tab === "images" ? <ImagesTab /> : null}
    </div>
  );
}
