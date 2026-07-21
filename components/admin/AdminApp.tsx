"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/data/products";
import type { Article } from "@/data/articles";
import type { Site } from "@/data/site";
import type { NavItem } from "@/data/navigation";
import type { TrustPoint, ServicePanelItem } from "@/data/services";
import type { HomeBlock, TestimonialsSection } from "@/data/home";
import type { Testimonial } from "@/data/testimonials";
import { Button, Card, Field, Input, Row, Select, Textarea } from "./ui";
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
          ? "Đã lưu vào GitHub. Website sẽ cập nhật sau ~1 phút (Vercel tự deploy)."
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
  block,
  onChange,
  imgW,
  imgH,
}: {
  title: string;
  block: HomeBlock;
  onChange: (fn: (b: HomeBlock) => void) => void;
  imgW: number;
  imgH: number;
}) {
  return (
    <Card title={title}>
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
        {home.loading ? <p className="text-[13px] text-text-secondary">Đang tải…</p> : null}
        {home.data ? (
          <>
            <BlockEditor
              title="Khối Hero (đầu trang)"
              block={home.data.hero}
              imgW={2200}
              imgH={1467}
              onChange={(fn) => home.update((d) => fn(d.hero))}
            />
            <BlockEditor
              title="Khối Câu chuyện"
              block={home.data.story}
              imgW={1200}
              imgH={1500}
              onChange={(fn) => home.update((d) => fn(d.story))}
            />
            <BlockEditor
              title="Khối Kiểm định"
              block={home.data.certification}
              imgW={1200}
              imgH={1600}
              onChange={(fn) => home.update((d) => fn(d.certification))}
            />

            <Card title="3 điểm mạnh dưới Hero (USP)">
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
        {site.data ? (
          <>
            <Card title="Thương hiệu">
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

function ProductsTab() {
  const doc = useDoc<ProductsDoc>("products.json");
  const [idx, setIdx] = useState(0);
  const p = doc.data?.products[idx];

  return (
    <div className="flex flex-col gap-5">
      {doc.loading ? <p className="text-[13px] text-text-secondary">Đang tải…</p> : null}
      {doc.data ? (
        <>
          <Field label="Chọn sản phẩm">
            <Select value={idx} onChange={(e) => setIdx(Number(e.target.value))}>
              {doc.data.products.map((x, i) => (
                <option key={x.id} value={i}>
                  {x.name} — {x.productCode}
                </option>
              ))}
            </Select>
          </Field>

          {p ? (
            <>
              <Card title="Thông tin chính">
                <Row>
                  <Field label="Tên sản phẩm">
                    <Input value={p.name} onChange={(e) => doc.update((d) => void (d.products[idx].name = e.target.value))} />
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
                  <Field label="Tình trạng">
                    <Select
                      value={p.availability}
                      onChange={(e) => doc.update((d) => void (d.products[idx].availability = e.target.value as Product["availability"]))}
                    >
                      <option value="con-hang">Còn hàng</option>
                      <option value="chi-con-1">Chỉ còn 1</option>
                      <option value="da-dat-truoc">Đã đặt trước</option>
                      <option value="da-ban">Đã bán</option>
                      <option value="lien-he">Liên hệ tư vấn</option>
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
                    Hiện ở “Bộ sưu tập nổi bật” (trang chủ)
                  </label>
                  <label className="flex items-center gap-2 text-[13px]">
                    <input type="checkbox" checked={p.limited} onChange={(e) => doc.update((d) => void (d.products[idx].limited = e.target.checked))} />
                    Thuộc bộ sưu tập giới hạn
                  </label>
                </div>
              </Card>

              <Card title="Hình ảnh">
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

              <Card title="Thông số ngọc (để trống = ẩn khỏi trang, KHÔNG bịa số liệu)">
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
      <Card title="Thay ảnh theo đường dẫn tự chọn">
        <p className="text-[12px] leading-relaxed text-text-secondary">
          Dùng khi cần thay một ảnh cụ thể trên site (ví dụ ảnh chứng thư, ảnh editorial). Nhập
          đường dẫn ảnh hiện tại rồi chọn file mới — hệ thống lưu bằng tên mới để tránh cache ảnh cũ.
          Sau khi tải xong, ảnh chỉ hiển thị nếu đường dẫn mới được dùng ở nơi tương ứng.
        </p>
        <ImageField label="Ảnh" value={customPath} onChange={setCustomPath} />
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
