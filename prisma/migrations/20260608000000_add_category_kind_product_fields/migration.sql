CREATE TYPE "CategoryKind" AS ENUM ('ANIMAL', 'PRODUCE', 'PACKAGED', 'GENERAL');

ALTER TABLE "ProductCategory"
ADD COLUMN "kind" "CategoryKind" NOT NULL DEFAULT 'GENERAL';

UPDATE "ProductCategory"
SET "kind" = 'ANIMAL'
WHERE "slug" IN ('dairy-cows', 'meat-cows', 'lamb', 'goats', 'chickens');

UPDATE "ProductCategory"
SET "kind" = 'PRODUCE'
WHERE "slug" IN ('eggs', 'vegetables', 'dates', 'figs', 'oranges');

UPDATE "ProductCategory"
SET "kind" = 'PACKAGED'
WHERE "slug" IN ('honey');

ALTER TABLE "Product"
ADD COLUMN "unit" TEXT,
ADD COLUMN "quantity" TEXT,
ADD COLUMN "harvestDate" TIMESTAMP(3),
ADD COLUMN "packageSize" TEXT;

ALTER TABLE "ProductTranslation"
ADD COLUMN "storageNotes" TEXT,
ADD COLUMN "ingredients" TEXT;

CREATE INDEX "Product_harvestDate_idx" ON "Product"("harvestDate");
